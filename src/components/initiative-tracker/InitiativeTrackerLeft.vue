<script lang="ts" setup>
import NewCreature from "./NewCreature.vue";
import NewInitiativeCount from "./NewInitiativeCount.vue";
import { useInitiativeTracker } from "@state/InitiativeTrackerState.ts";

const { addInitiative } = useInitiativeTracker();
</script>

<template>
  <div>
    <NewCreature @new-creature="addInitiative" />
    <NewInitiativeCount @new-initiative-count="addInitiative" />
  </div>
</template>
