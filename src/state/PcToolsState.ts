import { useStorage } from "@/composables/useStorage";
import type Pc from "@model/Pc";
import { computed } from "vue";

const STORAGE_KEY: string = "PC_TOOLS";
const DEFAULT_VALUE: PcToolsState = { pcsList: [], selectedPcId: null };

type PcToolsState = {
  pcsList: Pc[];
  selectedPcId: number | null;
};

const { pcsList, selectedPcId } = (function () {
  const fromStorage = useStorage<PcToolsState>(DEFAULT_VALUE, STORAGE_KEY);

  const pcsList = computed({
    get: () => fromStorage.value.pcsList,
    set: (v) => (fromStorage.value.pcsList = v),
  });

  const selectedPcId = computed({
    get: () => fromStorage.value.selectedPcId,
    set: (v) => (fromStorage.value.selectedPcId = v),
  });

  return { pcsList, selectedPcId };
})();

const selectedPc = computed(
  () => pcsList.value.filter((pc) => pc.id === selectedPcId.value)[0] ?? null,
);

function addPc(newPc: Pc): void {
  if (newPc.id in pcsList.value.map((pc) => pc.id)) return;

  pcsList.value.push(newPc);
}

function removePc(oldPcId: Pc["id"]): void {
  if (!pcsList.value.map((pc) => pc.id).includes(oldPcId)) return;

  if (selectedPcId.value === oldPcId) selectedPcId.value = null;

  pcsList.value = pcsList.value.filter((pc) => pc.id !== oldPcId);
}

function selectPc(pcId: Pc["id"]): void {
  if (!pcsList.value.map((pc) => pc.id).includes(pcId)) return;

  selectedPcId.value = pcId;
}

export function usePcTools() {
  return {
    pcsList,
    selectedPcId,
    selectedPc,

    addPc,
    removePc,
    selectPc,
  };
}
