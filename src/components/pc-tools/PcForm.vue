<script setup lang="ts">
import { usePcTools } from "@/state/PcToolsState";
import SpellSlotInput from "./spell-slot-input/SpellSlotInput.vue";

const { selectedPc } = usePcTools();
</script>

<template>
  <v-container v-if="selectedPc !== null">
    <v-row>
      <v-col>
        <h2>{{ selectedPc.name }}</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-number-input
          label="Hp"
          control-variant="split"
          variant="outlined"
          flat
          hide-details
          v-model="selectedPc.hp.current"
          :min="selectedPc.hp.min"
          :max="selectedPc.hp.max"
          :suffix="` / ${selectedPc.hp.max}`"
        />
      </v-col>

      <v-col v-if="selectedPc.tempHp !== null" cols="12" sm="6">
        <v-number-input
          label="Temp Hp"
          control-variant="split"
          variant="outlined"
          flat
          hide-details
          v-model="selectedPc.tempHp.current"
          :min="selectedPc.tempHp.min"
          :max="selectedPc.tempHp.max"
          :suffix="` / ${selectedPc.tempHp.max}`"
        />
      </v-col>
    </v-row>

    <div v-if="selectedPc.spellSlots !== null">
      <v-card-title>Slot incantesimi</v-card-title>

      <v-row v-if="selectedPc!.spellSlots !== null">
        <v-col
          v-for="[level, spellSlot] in Object.entries(selectedPc.spellSlots).filter(
            ([_, val]) => val,
          )"
          :key="level"
          cols="12"
          sm="6"
        >
          <spell-slot-input
            v-model.number="spellSlot.current"
            :max-spell-slots="spellSlot.max"
            :spell-slots-level="level"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style lang="scss" scoped></style>
