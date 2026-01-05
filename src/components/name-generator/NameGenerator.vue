<script setup lang="ts">
import { ref } from "vue";
import { useNameGenerator } from "@state/NameGeneratorState";

const HISTORY_COUNT = 10;

const loadingError = ref<string>();
const loading = ref<boolean>(true);

const generateCb = ref<() => string>();
const generated = ref<string[]>([]);

useNameGenerator()
  .then(({ generate }) => {
    generateCb.value = generate;
    loading.value = false;
  })
  .catch((err) => {
    loadingError.value = err ?? "Errore";
    loading.value = false;
  });

function generateNewName(count: number = 1): void {
  for (let i = 0; i < count; ++i) generated.value.push(generateCb.value!());
  while (generated.value.length > HISTORY_COUNT) generated.value.shift();
}
</script>

<template>
  <v-alert v-if="loadingError" title="Errore" :text="loadingError" color="error" />

  <v-container v-else>
    <v-row class="pa-6">
      <v-spacer />
      <v-btn v-if="!loading" @click="generateNewName()" color="primary" text="Genera" />
      <v-spacer />
      <v-btn
        v-if="!loading"
        @click="generateNewName(HISTORY_COUNT)"
        color="primary"
        :text="`Genera ${HISTORY_COUNT}`"
      />
      <v-spacer />
    </v-row>

    <v-row class="pa-4">
      <v-col
        v-for="(name, i) of generated.toReversed()"
        v-bind:key="i"
        cols="12"
        md="6"
        class="text-center text-capitalize"
      >
        {{ name }}
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped></style>
