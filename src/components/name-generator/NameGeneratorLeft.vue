<script setup lang="ts">
import { useNameGenerator } from "@state/NameGeneratorState";

const { generatorsList, selectedGenerator, selectGenerator } = useNameGenerator();
</script>

<template>
  <v-btn-group direction="vertical" style="width: 100%">
    <v-btn
      v-for="generator of generatorsList"
      v-bind:key="generator.id"
      :active="generator.id === selectedGenerator?.id"
      :text="generator.name"
      @click.stop.prevent="selectGenerator(generator.id)"
    />
  </v-btn-group>
</template>

<style lang="scss" scoped></style>
