import { ref, computed, type WatchHandle, watchEffect } from "vue";
import { fromJSON } from "@decorators/JsonSerializable";

const STORAGE_KEY: string = "INITIATIVE_TRACKER";
const STORAGE: Storage = localStorage;
const DEFAULT_VALUE: WithInitiative[] = [];

let WATCHER: WatchHandle;

function readFromStorage(): WithInitiative[] {
  const inStorage: string | null = STORAGE.getItem(STORAGE_KEY);
  if (inStorage === null) return DEFAULT_VALUE;

  try {
    return JSON.parse(inStorage, fromJSON) as WithInitiative[];
  } catch {
    return DEFAULT_VALUE;
  }
}

function writeToStorage(): void {
  try {
    STORAGE.setItem(STORAGE_KEY, JSON.stringify(initiatives.value));
  } catch {
    STORAGE.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VALUE));
  }
}

const initiatives = ref<WithInitiative[]>(readFromStorage());
const initiativesOrdered = computed(() => initiatives.value.toSorted(orderByInitiative));

function orderByInitiative(a: WithInitiative, b: WithInitiative): number {
  return b.initiative - a.initiative;
}

function addInitiative(initiative: WithInitiative): void {
  if (!initiative) return;

  initiatives.value.push(initiative);
}

function clearAll(): void {
  initiatives.value.splice(0, initiatives.value.length);
}

const currentInitiative = ref<number | undefined>(undefined);

function canAdvanceInitiative(): boolean {
  return initiatives.value.length > 1;
}

function advanceInitiative(): void {
  if (canAdvanceInitiative()) return;

  if (typeof currentInitiative.value === "undefined") {
    currentInitiative.value = initiativesOrdered.value[0]?.initiative;
    return;
  }

  const nextInOrder = initiativesOrdered.value.filter(
    (i) => i.initiative < currentInitiative.value!,
  );
  if (nextInOrder.length === 0) currentInitiative.value = initiativesOrdered.value[0]?.initiative;
  else currentInitiative.value = nextInOrder[0]!.initiative;
}

export interface WithInitiative {
  initiative: number;
}

export function useInitiativeTracker() {
  if (typeof WATCHER === "undefined") WATCHER = watchEffect(writeToStorage);

  return {
    initiatives,
    initiativesOrdered,
    addInitiative,
    clearAll,

    currentInitiative,
    canAdvanceInitiative,
    advanceInitiative,
  };
}
