<script setup lang="ts">
import { ref } from "vue";

import type { ValidationRule } from "vuetify";
import type { VForm } from "vuetify/components";

const form = ref<VForm>();

const emits = defineEmits<{
  (
    e: "confirm",
    isPlayer: boolean,
    name: string,
    initiative: number,
    armorClass: number | undefined,
    hitPointsCurrent: number | undefined,
    hitPointsMax: number | undefined,
    number: number,
  ): void;
  (e: "cancel"): void;
}>();

const isPlayer = defineModel<boolean>("isPlayer", { default: true });
const name = defineModel<string>("name", { default: "" });
const initiative = defineModel<number>("initiative", { default: undefined });
const armorClass = defineModel<number>("armorClass", { default: undefined });
const hitPointsCurrent = defineModel<number>("hitPointsCurrent", { default: undefined });
const hitPointsMax = defineModel<number>("hitPointsMax", { default: undefined });

const number = ref<number>(1);

const numberRules = ref<ValidationRule[]>([
  (v: number) => v !== null || "Number is required",
  (v: number) =>
    (v && typeof v === "number" && v > 0 && Number.isInteger(v)) ||
    "Number must be a positive integer",
]);
const nameRules = ref<ValidationRule[]>([
  (v: string) => (v !== null && v.length > 0) || "Name is required",
]);
const initiativeRules = ref<ValidationRule[]>([
  (v: number) => v !== null || "Initiative is required",
  (v: number) =>
    (v && typeof v === "number" && Number.isInteger(v)) || "Initiative must be an integer",
]);
const armorClassRules = ref<ValidationRule[]>([
  (v: number) =>
    !v || (typeof v === "number" && Number.isInteger(v)) || "Armor class must be an integer",
]);
const hitPointsMaxRules = ref<ValidationRule[]>([
  (v: number) =>
    !v ||
    (typeof v === "number" && v > 0 && Number.isInteger(v)) ||
    "Hit points max must be a positive integer",
]);
const hitPointsCurrentRules = ref<ValidationRule[]>([
  (v: number) =>
    !v ||
    (typeof v === "number" && v > 0 && Number.isInteger(v)) ||
    "Hit points current must be a positive integer",
  (v: number) =>
    !hitPointsMax.value ||
    !v ||
    v <= hitPointsMax.value ||
    `Cannot be more than ${hitPointsMax.value}`,
]);

function submit() {
  if (!form.value?.isValid) return;

  emits(
    "confirm",
    isPlayer.value,
    name.value,
    initiative!.value,
    armorClass.value,
    hitPointsCurrent.value,
    hitPointsMax.value,
    number.value,
  );
}
</script>

<template>
  <v-form validate-on="invalid-input" @submit.prevent="submit" ref="form">
    <v-card-text>
      <v-row>
        <v-col cols="6" md="8">
          <v-switch
            v-model="isPlayer"
            false-icon="$monster"
            true-icon="$hero"
            @change.stop.prevent="number = 1"
          >
            <template v-if="isPlayer" v-slot:label>Eroe</template>
            <template v-else v-slot:label>Mostro</template>
          </v-switch>
        </v-col>
        <v-col cols="6" md="4">
          <v-number-input
            v-if="!isPlayer"
            label="Numero"
            control-variant="stacked"
            :rules="numberRules"
            :min="1"
            v-model="number"
            required
          />
        </v-col>
        <v-col cols="12" :md="isPlayer ? 4 : 8">
          <v-text-field v-model="name" label="Nome" :rules="nameRules" required />
        </v-col>
        <v-col cols="6" md="4">
          <v-number-input
            label="Iniziativa"
            control-variant="stacked"
            :rules="initiativeRules"
            v-model="initiative"
            required
          />
        </v-col>
        <v-col cols="6" md="4">
          <v-number-input
            label="CA"
            control-variant="stacked"
            :rules="armorClassRules"
            v-model="armorClass"
          />
        </v-col>
        <v-col v-if="!isPlayer" cols="6" md="4">
          <v-number-input
            label="HP attuali"
            control-variant="stacked"
            :rules="hitPointsCurrentRules"
            :min="0"
            :max="hitPointsMax ? hitPointsMax : undefined"
            v-model="hitPointsCurrent"
          />
        </v-col>
        <v-col v-if="!isPlayer" cols="6" md="4">
          <v-number-input
            label="HP massimi"
            control-variant="stacked"
            :rules="hitPointsMaxRules"
            :min="0"
            v-model="hitPointsMax"
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn type="reset" text="Annulla" variant="plain" @click="$emit('cancel')"></v-btn>
      <v-btn type="submit" color="primary" text="Salva" variant="tonal"></v-btn>
    </v-card-actions>
  </v-form>
</template>

<style lang="sass" scoped></style>
