<script setup lang="ts">
import CreatureInitiative from "./CreatureInitiativeItem.vue";
import InitiativeCountInitiativeItem from "./InitiativeCountInitiativeItem.vue";
import Creature from "@model/Creature";
import NewCreature from "./NewCreature.vue";
import InitiativeCount from "@model/InitiativeCount";
import NewInitiativeCount from "./NewInitiativeCount.vue";

import { useInitiativeTracker, type WithInitiative } from "@state/InitiativeTrackerState.ts";

const { initiativesOrdered, addInitiative } = useInitiativeTracker();

function isCreature(item: WithInitiative): item is Creature {
  return item instanceof Creature;
}

function isInitiativeCount(item: WithInitiative): item is InitiativeCount {
  return item instanceof InitiativeCount;
}
</script>

<template>
  <NewCreature @new-creature="addInitiative" />
  <NewInitiativeCount @new-initiative-count="addInitiative" />
  <div class="tracker-container">
    <template v-for="(item, idx) in initiativesOrdered" :key="idx">
      <CreatureInitiative
        v-if="isCreature(item)"
        :creature="item"
        @update-hit-points-current="
          (creature, newHitPoints) => (creature.hitPointsCurrent = newHitPoints)
        "
      />
      <InitiativeCountInitiativeItem v-if="isInitiativeCount(item)" :initiativeCount="item" />
    </template>
  </div>
</template>

<style type="sass" scoped>
.tracker-container {
  display: flex;
  flex-direction: column;

  row-gap: 1.5em;
}
</style>
