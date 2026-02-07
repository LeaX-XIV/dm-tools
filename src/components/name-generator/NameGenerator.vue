<script setup lang="ts">
import { ref } from "vue";
import { useNameGenerator } from "@state/NameGeneratorState";

const HISTORY_COUNT = 10;

const { selectedGenerator, generate } = useNameGenerator();
const generated = ref<string[]>([]);

async function generateNewName(count: number = 1): Promise<void> {
  for (let i = 0; i < count; ++i) {
    const newName = await generate();
    if (newName !== null) generated.value.push(newName);
  }
  while (generated.value.length > HISTORY_COUNT) generated.value.shift();
}
</script>

<template>
  <v-container>
    <v-row class="pa-6">
      <v-spacer />
      <v-btn
        v-if="selectedGenerator !== null"
        @click="generateNewName()"
        color="primary"
        text="Genera"
      />
      <v-spacer />
      <v-btn
        v-if="selectedGenerator !== null"
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
