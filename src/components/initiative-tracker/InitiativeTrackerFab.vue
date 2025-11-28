<script setup lang="ts">
import { useInitiativeTracker } from "@state/InitiativeTrackerState.ts";
import { mdiUpdate } from "@mdi/js";

const { canAdvanceInitiative, advanceInitiative } = useInitiativeTracker();
</script>

<template>
  <v-fab
    v-if="canAdvanceInitiative"
    :active="canAdvanceInitiative"
    location="bottom right"
    :icon="mdiUpdate"
    app
    @click="advanceInitiative"
  />
</template>

<style scoped></style>
