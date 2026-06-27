<script setup lang="ts">
import CurrentMax from "@/model/CurrentMax";
import { ref } from "vue";
import type { ValidationRule } from "vuetify";
import type { VForm } from "vuetify/components";

const form = ref<VForm>();
const emits = defineEmits<{
  (
    e: "confirm",
    newName: string,
    newHitPoints: CurrentMax,
    newTempHitPoints: CurrentMax,
    spellSlots: CurrentMax[],
  ): void;
  (e: "cancel"): void;
}>();

const input = defineProps<{
  name?: string;
  hitPoints?: number | CurrentMax;
  tempHitPoints?: number | CurrentMax;
  spellSlots?: number[] | CurrentMax[];
}>();

const hitPoints = ref<CurrentMax>(CurrentMax.parse(input.hitPoints));
const tempHitPoints = ref<CurrentMax>(CurrentMax.parse(input.tempHitPoints));
const spellSlots = ref<CurrentMax[]>(
  Array(9)
    .fill(() => 0)
    .map((_, i, arr) => CurrentMax.parse((input?.spellSlots ?? arr)[i])),
);

const name = ref(input.name ?? "");
const hitPointsMax = ref(hitPoints.value.max);
const tempHitPointsMax = ref(tempHitPoints.value.max);
const spellSlotsMax = ref(spellSlots.value.map((slot) => slot.max));

const nameRules = ref<ValidationRule[]>([
  (v: string) => (v !== null && v.length > 0) || "Name is required",
]);
const numberRules = ref<ValidationRule[]>([
  (v: number) =>
    !v ||
    (typeof v === "number" && v > 0 && Number.isInteger(v)) ||
    "Hit points max must be a positive integer",
]);

function submit() {
  if (!form.value?.isValid) return;

  hitPoints.value.max = hitPointsMax.value;
  tempHitPoints.value.max = tempHitPointsMax.value;

  spellSlots.value[0]!.max = spellSlotsMax.value[0] ?? 0;
  spellSlots.value[1]!.max = spellSlotsMax.value[1] ?? 0;
  spellSlots.value[2]!.max = spellSlotsMax.value[2] ?? 0;
  spellSlots.value[3]!.max = spellSlotsMax.value[3] ?? 0;
  spellSlots.value[4]!.max = spellSlotsMax.value[4] ?? 0;
  spellSlots.value[5]!.max = spellSlotsMax.value[5] ?? 0;
  spellSlots.value[6]!.max = spellSlotsMax.value[6] ?? 0;
  spellSlots.value[7]!.max = spellSlotsMax.value[7] ?? 0;
  spellSlots.value[8]!.max = spellSlotsMax.value[8] ?? 0;

  emits(
    "confirm",
    name.value,
    hitPoints.value as CurrentMax,
    tempHitPoints.value as CurrentMax,
    spellSlots.value as CurrentMax[],
  );
}
</script>

<template>
  <v-form validate-on="invalid-input" @submit.prevent="submit" ref="form">
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Nome" v-model="name" :rules="nameRules" required />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-number-input
            label="HP massimi"
            control-variant="stacked"
            :rules="numberRules"
            :min="0"
            v-model.lazy="hitPointsMax"
          />
        </v-col>
        <v-col cols="6">
          <v-number-input
            label="Temp HP massimi"
            control-variant="stacked"
            :rules="numberRules"
            :min="0"
            v-model.lazy="tempHitPointsMax"
          />
        </v-col>
      </v-row>

      <v-expansion-panels>
        <v-expansion-panel title="Slot incantesimi">
          <v-expansion-panel-text>
            <v-row>
              <v-col v-for="(_, i) in spellSlotsMax" :key="i" cols="6" sm="4">
                <v-number-input
                  :label="`Livello ${i + 1}`"
                  control-variant="stacked"
                  :rules="numberRules"
                  :min="0"
                  v-model="spellSlotsMax[i]"
                />
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer />
      <v-btn type="reset" text="Annulla" variant="plain" @click="$emit('cancel')" />
      <v-btn type="submit" color="primary" text="Salva" variant="tonal" />
    </v-card-actions>
  </v-form>
</template>

<style lang="scss" scoped></style>
