<script setup lang="ts">
import { ref, computed } from "vue";
import CharacterInitiativeItem from "./CharacterInitiativeItem.vue";
import InitiativeCountInitiativeItem from "./InitiativeCountInitiativeItem.vue";
import NewCharacter from "./NewCharacter.vue";
import Character from "@model/Character.ts";
import InitiativeCount from "@model/InitiativeCount.ts";
import NewInitiativeCount from "./NewInitiativeCount.vue";

interface WithInitiative {
  initiative: number;
}

const characters = ref<WithInitiative[]>([]);

const ordered = computed(() => characters.value.toSorted((a, b) => b.initiative - a.initiative));

function isCharacter(item: WithInitiative): item is Character {
  return item instanceof Character;
}

function isInitiativeCount(item: WithInitiative): item is InitiativeCount {
  return item instanceof InitiativeCount;
}
</script>

<template>
  <NewCharacter @new-character="(ch) => characters.push(ch)" />
  <NewInitiativeCount @new-initiative-count="(ic) => characters.push(ic)" />
  <div class="tracker-container">
    <template v-for="(item, idx) in ordered" :key="idx">
      <CharacterInitiativeItem v-if="isCharacter(item)" :character="item" />
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
