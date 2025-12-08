<script setup lang="ts">
import CreatureInitiative from "./CreatureInitiativeItem.vue";
import InitiativeCountInitiativeItem from "./InitiativeCountInitiativeItem.vue";
import Creature from "@model/Creature";
import InitiativeCount from "@model/InitiativeCount";

import { useInitiativeTracker, type WithInitiative } from "@state/InitiativeTrackerState.ts";

const { initiativesOrdered, currentInitiative } = useInitiativeTracker();

function isCreature(item: WithInitiative): item is Creature {
  return item instanceof Creature;
}

function isInitiativeCount(item: WithInitiative): item is InitiativeCount {
  return item instanceof InitiativeCount;
}
</script>

<template>
  <v-list>
    <template v-slot:divider><v-divider /></template>
    <template v-for="(item, idx) in initiativesOrdered" :key="idx">
      <CreatureInitiative
        v-if="isCreature(item)"
        :isActive="item.initiative === currentInitiative"
        :isPlayer="item.isPlayer"
        v-model:name="item.name"
        v-model:initiaitve="item.initiative"
        v-model:armorClass="item.armorClass"
        v-model:hitPointsCurrent="item.hitPointsCurrent"
        v-model:hitPointsMax="item.hitPointsMax"
      />
      <InitiativeCountInitiativeItem
        v-else-if="isInitiativeCount(item)"
        :initiativeCount="item"
        :active="item.initiative === currentInitiative"
      />
    </template>
  </v-list>
</template>

<style scoped></style>
