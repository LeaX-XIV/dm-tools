<script setup lang="ts">
import { ref, watch } from "vue";
import Creature from "@model/Creature";

import type { ValidationRule } from "vuetify";
import type { VForm } from "vuetify/components";

const emit = defineEmits<{
  (e: "new-creature", creature: Creature): void;
}>();

const open = ref(false);
const form = ref<VForm>();

const isHero = ref(true);

const number = ref(1);
const numberRules = ref<ValidationRule[]>([
  (v: number) => v !== null || "Number is required",
  (v: number) =>
    (v && typeof v === "number" && v > 0 && Number.isInteger(v)) ||
    "Number must be a positive integer",
]);

const name = ref("");
const nameRules = ref<ValidationRule[]>([
  (v: string) => (v !== null && v.length > 0) || "Name is required",
]);

const initiative = ref<number>();
const initiativeRules = ref<ValidationRule[]>([
  (v: number) => v !== null || "Initiative is required",
  (v: number) =>
    (v && typeof v === "number" && Number.isInteger(v)) || "Initiative must be an integer",
]);

const armorClass = ref<number>();
const armorClassRules = ref<ValidationRule[]>([
  (v: number) =>
    !v || (typeof v === "number" && Number.isInteger(v)) || "Armor class must be an integer",
]);

const hitPointsMax = ref<number>();
const hitPointsMaxRules = ref<ValidationRule[]>([
  (v: number) =>
    !v ||
    (typeof v === "number" && v > 0 && Number.isInteger(v)) ||
    "Hit points max must be a positive integer",
]);

const hitPointsCurrent = ref<number>();
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

watch(open, () => {
  if (!form.value)
    // Protection during component mounting
    return;

  isHero.value = true;
  number.value = 1;
  name.value = "";
  initiative.value = undefined;
  armorClass.value = undefined;
  hitPointsMax.value = undefined;
  hitPointsCurrent.value = undefined;
});

function save() {
  if (!form.value.isValid) return;

  const count = number.value;
  for (let i = 0; i < count; ++i) {
    emit(
      "new-creature",
      new Creature(
        isHero.value ? name.value : `${name.value} ${i + 1}`,
        Number(initiative.value),
        armorClass.value ? Number(armorClass.value) : undefined,
        hitPointsMax.value ? Number(hitPointsMax.value) : undefined,
        hitPointsCurrent.value ? Number(hitPointsCurrent.value) : undefined,
      ),
    );
  }

  open.value = false;
}
</script>

<template>
  <v-btn prepend-icon="$creature" block @click.stop.prevent="open = true">Creatura</v-btn>

  <v-dialog v-model="open" max-width="600" persistent>
    <v-card title="Creatura">
      <v-form validate-on="invalid-input" @submit.prevent="save" ref="form">
        <v-card-text>
          <v-row>
            <v-col cols="6" md="8">
              <v-switch
                v-model="isHero"
                false-icon="$monster"
                true-icon="$hero"
                @change.stop.prevent="number = 1"
              >
                <template v-if="isHero" v-slot:label>Eroe</template>
                <template v-else v-slot:label>Mostro</template>
              </v-switch>
            </v-col>
            <v-col cols="6" md="4">
              <v-number-input
                v-if="!isHero"
                label="Numero"
                control-variant="stacked"
                :rules="numberRules"
                :min="1"
                v-model="number"
                required
              />
            </v-col>
            <v-col cols="12" :md="isHero ? 4 : 8">
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
            <v-col v-if="!isHero" cols="6" md="4">
              <v-number-input
                label="HP attuali"
                control-variant="stacked"
                :rules="hitPointsCurrentRules"
                :min="0"
                :max="hitPointsMax ? hitPointsMax : undefined"
                v-model="hitPointsCurrent"
              />
            </v-col>
            <v-col v-if="!isHero" cols="6" md="4">
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

          <v-btn type="reset" text="Annulla" variant="plain" @click="open = false"></v-btn>
          <v-btn type="submit" color="primary" text="Salva" variant="tonal"></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
