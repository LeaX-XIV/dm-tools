<script setup lang="ts">
import { ref, computed } from "vue";
import CreatureInitiative from "./CreatureInitiativeItem.vue";
import InitiativeCountInitiativeItem from "./InitiativeCountInitiativeItem.vue";
import Creature from "@/model/Creature";
import NewCreature from "./NewCreature.vue";
import InitiativeCount from "@model/InitiativeCount";
import NewInitiativeCount from "./NewInitiativeCount.vue";

interface WithInitiative {
  initiative: number;
}

const initiatives = ref<WithInitiative[]>([]);
const ordered = computed(() => initiatives.value.toSorted((a, b) => b.initiative - a.initiative));

function isCreature(item: WithInitiative): item is Creature {
  return item instanceof Creature;
}

function isInitiativeCount(item: WithInitiative): item is InitiativeCount {
  return item instanceof InitiativeCount;
}
</script>

<template>
  <NewCreature @new-creature="(ch) => initiatives.push(ch)" />
  <NewInitiativeCount @new-initiative-count="(ic) => initiatives.push(ic)" />
  <div class="tracker-container">
    <template v-for="(item, idx) in ordered" :key="idx">
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
