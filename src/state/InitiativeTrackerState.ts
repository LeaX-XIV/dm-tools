import { ref, computed, type WatchHandle, watchEffect } from "vue";
import Creature from "@model/Creature";
import InitiativeCount from "@model/InitiativeCount";

const Types = {
  Creature: Creature,
  InitiativeCount: InitiativeCount,
};

const STORAGE_KEY = "INITIATIVE_TRACKER";
const STORAGE: Storage = localStorage;
const DEFAULT_VALUE: WithInitiative[] = [];

let WATCHER: WatchHandle;

function readFromStorage() {
  const inStorage = STORAGE.getItem(STORAGE_KEY);
  if (inStorage === null) return DEFAULT_VALUE;

  try {
    return JSON.parse(inStorage, function (k, v) {
      const type = v !== null && v.hasOwnProperty("__type") ? Types[v.__type] : null;

      if (type === Creature)
        return new Creature(v.name, v.initiative, v.armorClass, v.hitPointsMax, v.hitPointsCurrent);
      if (type === InitiativeCount) return new InitiativeCount(v.initiative, v.name);

      return v;
    }) as WithInitiative[];
  } catch {
    return DEFAULT_VALUE;
  }
}

function writeToStorage() {
  try {
    STORAGE.setItem(STORAGE_KEY, JSON.stringify(initiatives.value, jsonReplacer));
  } catch {
    STORAGE.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VALUE));
  }
}

function jsonReplacer(key: string, value: unknown) {
  return value !== null &&
    typeof value !== "undefined" &&
    typeof value["jsonReplacer"] === "function"
    ? value.jsonReplacer()
    : value;
}

const initiatives = ref<WithInitiative[]>(readFromStorage());

const initiativesOrdered = computed(() => initiatives.value.toSorted(orderByInitiative));

function orderByInitiative(a: WithInitiative, b: WithInitiative): number {
  return b.initiative - a.initiative;
}

function addInitiative(initiative: WithInitiative) {
  if (!initiative) return;

  initiatives.value.push(initiative);
}

function clearAll() {
  initiatives.value.splice(0, initiatives.value.length);
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
  };
}
