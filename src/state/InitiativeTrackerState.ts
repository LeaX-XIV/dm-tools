import { computed } from "vue";
import { useStorage } from "@/composables/useStorage";

const STORAGE_KEY: string = "INITIATIVE_TRACKER";
const DEFAULT_VALUE: InitiativeTrackerState = { initiatives: [], current: undefined };

type InitiativeTrackerState = {
  initiatives: WithInitiative[];
  current: number | undefined;
};

const { initiatives, currentInitiative } = (function () {
  const fromStorage = useStorage<InitiativeTrackerState>(DEFAULT_VALUE, STORAGE_KEY);

  const initiatives = computed({
    get: () => fromStorage.value.initiatives,
    set: (v) => (fromStorage.value.initiatives = v),
  });

  const currentInitiative = computed({
    get: () => fromStorage.value.current,
    set: (v) => (fromStorage.value.current = v),
  });

  return { initiatives, currentInitiative };
})();

const initiativesOrdered = computed(() => initiatives.value.toSorted(orderByInitiative));

function orderByInitiative(a: WithInitiative, b: WithInitiative): number {
  return b.initiative - a.initiative;
}

function addInitiative(initiative: WithInitiative): void {
  if (!initiative) return;

  initiatives.value.push(initiative);
}

function removeInitiative(toRemove: WithInitiative): void {
  if (!toRemove) return;

  initiatives.value = initiatives.value.filter((init) => toRemove !== init);
}

function clearAll(): void {
  initiatives.value.splice(0, initiatives.value.length);
  currentInitiative.value = undefined;
}

const canAdvanceInitiative = computed(() => initiatives.value.length > 1);

function advanceInitiative(): void {
  if (!canAdvanceInitiative.value) return;

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
  return {
    initiatives,
    initiativesOrdered,
    addInitiative,
    removeInitiative,
    clearAll,

    currentInitiative,
    canAdvanceInitiative,
    advanceInitiative,
  };
}
