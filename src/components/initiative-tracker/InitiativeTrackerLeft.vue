<script lang="ts" setup>
import ClearInitiatives from "./ClearInitiatives.vue";
import NewCreature from "./NewCreature.vue";
import NewInitiativeCount from "./NewInitiativeCount.vue";
import { useInitiativeTracker } from "@state/InitiativeTrackerState.ts";

const { addInitiative } = useInitiativeTracker();
</script>

<template>
  <v-btn-group direction="vertical" style="width: 100%">
    <NewCreature @new-creature="addInitiative" />
    <NewInitiativeCount @new-initiative-count="addInitiative" />
    <v-divider />
    <ClearInitiatives />
  </v-btn-group>
</template>
