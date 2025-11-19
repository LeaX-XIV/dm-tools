<script setup lang="ts">
import InitiativeCount from "@model/InitiativeCount";

const { initiativeCount } = defineProps<{ initiativeCount: InitiativeCount }>();
</script>

<template>
  <v-list-item density="compact" color="error">
    <v-sheet class="d-flex align-center gc-1">
      <hr class="flex-grow-1" />
      <v-list-item-title class="title">{{ initiativeCount.name }}</v-list-item-title>
      <hr class="flex-grow-1" />
    </v-sheet>
  </v-list-item>
</template>

<style lang="scss" scoped>
$color-error: rgb(var(--v-theme-error));

hr,
.title {
  color: $color-error;
  border-color: $color-error;
}
</style>
