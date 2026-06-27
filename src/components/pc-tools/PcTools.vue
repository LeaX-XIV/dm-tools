<script setup lang="ts">
import Pc from "@/model/Pc";
import { usePcTools } from "@state/PcToolsState";
import PcForm from "./PcForm.vue";
import PcEdit from "./PcEdit.vue";
import type CurrentMax from "@/model/CurrentMax.ts";

const { selectedPc, addPc, selectPc } = usePcTools();

function newPc(
  name: string,
  hitPoints: CurrentMax,
  tempHitPoints: CurrentMax,
  spellSlots: CurrentMax[],
) {
  const pc = new Pc(
    name,
    hitPoints.max,
    hitPoints.max,
    tempHitPoints.max,
    tempHitPoints.max,
    spellSlots.slice(
      0,
      spellSlots.findIndex((slot) => slot.max === 0),
    ),
  );
  addPc(pc);
  selectPc(pc.id);
}
</script>

<template>
  <div v-if="selectedPc == null">
    <PcEdit @confirm="newPc"></PcEdit>
  </div>
  <PcForm v-else />
</template>

<style lang="scss" scoped></style>
