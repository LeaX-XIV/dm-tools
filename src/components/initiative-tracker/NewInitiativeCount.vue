<script setup lang="ts">
import type { ValidationRule } from "vuetify";
import type { VForm } from "vuetify/components";

import { ref, shallowRef, watch } from "vue";
import InitiativeCount from "@model/InitiativeCount";

const emit = defineEmits<{
  (e: "new-initiative-count", initiativeCount: InitiativeCount): void;
}>();

const open = shallowRef(false);
const form = ref<VForm>();

const name = ref<string>();
const initiative = ref<number>(20);
const initiativeRules = ref<ValidationRule[]>([
  (v: number) => v !== null || "Initiative is required",
  (v: number) =>
    (v && typeof v === "number" && v >= 0 && Number.isInteger(v)) ||
    "Initiative must be a positive integer",
]);

watch(open, () => {
  if (!form.value)
    // Protection during component mounting
    return;

  name.value = "";
  initiative.value = 20;
});

function save() {
  if (!form.value.isValid) return;

  emit("new-initiative-count", new InitiativeCount(initiative.value, name.value));
  open.value = false;
}
</script>

<template>
  <v-btn prepend-icon="$initiativeCount" block @click.stop.prevent="open = true">Iniziativa</v-btn>

  <v-dialog v-model="open" max-width="600" persistent>
    <v-card title="Iniziativa">
      <v-form validate-on="invalid-input" @submit.prevent="save" ref="form">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="5">
              <v-number-input
                label="Iniziativa"
                control-variant="split"
                :rules="initiativeRules"
                v-model="initiative"
                required
              />
            </v-col>
            <v-col>
              <v-text-field v-model="name" label="Nome" />
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
