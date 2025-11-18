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
</script>

<template>
  <v-row v-for="(item, idx) in initiativesOrdered" :key="idx">
    <v-col>
      <CreatureInitiative
        v-if="isCreature(item)"
        :creature="item"
        @update-hit-points-current="
          (creature, newHitPoints) => (creature.hitPointsCurrent = newHitPoints)
        "
      />
      <InitiativeCountInitiativeItem v-if="isInitiativeCount(item)" :initiativeCount="item" />
    </v-col>
  </v-row>
</template>

<style scoped></style>
