<script setup lang="ts">
import CreatureInitiative from "./CreatureInitiativeItem.vue";
import InitiativeCountInitiativeItem from "./InitiativeCountInitiativeItem.vue";
import Creature from "@model/Creature";
import InitiativeCount from "@model/InitiativeCount";

import { useInitiativeTracker, type WithInitiative } from "@state/InitiativeTrackerState.ts";

const { initiativesOrdered } = useInitiativeTracker();

function isCreature(item: WithInitiative): item is Creature {
  return item instanceof Creature;
}

function isInitiativeCount(item: WithInitiative): item is InitiativeCount {
  return item instanceof InitiativeCount;
}

function updateHitPointsCurrent(creature: Creature, newHitPoints: number | null) {
  creature.hitPointsCurrent = newHitPoints;
}
</script>

<template>
  <v-list>
    <template v-slot:divider><v-divider /></template>
    <template v-for="(item, idx) in initiativesOrdered" :key="idx">
      <CreatureInitiative
        v-if="isCreature(item)"
        :creature="item"
        @update-hit-points-current="(newHitPoints) => updateHitPointsCurrent(item, newHitPoints)"
      />
      <InitiativeCountInitiativeItem v-else-if="isInitiativeCount(item)" :initiativeCount="item" />
    </template>
  </v-list>
</template>

<style scoped></style>
