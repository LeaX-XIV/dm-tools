<script setup lang="ts">
import { mdiSquareEditOutline } from "@mdi/js";
import PcEdit from "./PcEdit.vue";
import SpellSlotInput from "./spell-slot-input/SpellSlotInput.vue";
import { usePcTools } from "@/state/PcToolsState";
import type CurrentMax from "@/model/CurrentMax.ts";

const { selectedPc } = usePcTools();

function edit(
  newName: string,
  newHitPoints: CurrentMax,
  newTempHitPoints: CurrentMax,
  newSpellSlots: CurrentMax[],
) {
  if (selectedPc.value === null) return;

  selectedPc.value.name = newName;
  selectedPc.value.hp = newHitPoints;
  selectedPc.value.tempHp = newTempHitPoints.max === 0 ? null : newTempHitPoints;

  selectedPc.value.spellSlots = Object.assign(
    {},
    ...Object.keys(
      selectedPc.value.spellSlots ?? {
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined,
        7: undefined,
        8: undefined,
        9: undefined,
      },
    ).map((level, i) => ({
      [level]: newSpellSlots[i]?.max === 0 ? null : newSpellSlots[i],
    })),
  );
  if (Object.values(selectedPc.value?.spellSlots ?? {}).every((el) => el === null))
    selectedPc.value.spellSlots = null;
}
</script>

<template>
  <v-container v-if="selectedPc !== null">
    <v-row>
      <v-col>
        <h2>
          {{ selectedPc.name }}
          <v-dialog max-width="600" persistent>
            <template v-slot:activator="{ props: activatorProps }">
              <v-icon
                v-bind="activatorProps"
                :icon="mdiSquareEditOutline"
                opacity="50%"
                size="sm"
              ></v-icon>
            </template>

            <template v-slot:default="{ isActive: isEditDialogOpen }">
              <v-card :title="`Modifica ${selectedPc.name}`">
                <PcEdit
                  :name="selectedPc.name"
                  :hit-points="selectedPc.hp as CurrentMax"
                  :temp-hit-points="selectedPc.tempHp as CurrentMax"
                  :spell-slots="Object.values(selectedPc.spellSlots ?? []) as CurrentMax[]"
                  @confirm="
                    (...params) => {
                      edit(...params);
                      isEditDialogOpen.value = false;
                    }
                  "
                  @cancel="isEditDialogOpen.value = false"
                />
              </v-card>
            </template>
          </v-dialog>
        </h2>
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
