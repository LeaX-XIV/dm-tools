import { ref, computed } from "vue";

const initiatives = ref<WithInitiative[]>([]);
const initiativesOrdered = computed(() =>
  initiatives.value.toSorted((a, b) => b.initiative - a.initiative),
);

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
  return {
    initiatives,
    initiativesOrdered,
    addInitiative,
    clearAll,
  };
}
