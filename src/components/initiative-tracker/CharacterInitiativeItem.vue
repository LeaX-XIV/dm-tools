<script setup lang="ts">
import { reactive, computed } from "vue";
import CharacterHealth from "./CharacterHealth.vue";
import Character from "@model/Character.ts";

const { character } = defineProps<{ character: Character }>();

const hasCurrent = computed(() => character.hitPointsCurrent !== null);
const hasMax = computed(() => character.hitPointsMax !== null);
const hasAll = computed(() => hasCurrent.value && hasMax.value);

const isDead = computed(() => character.isDead);

const classObject = reactive({
  dead: isDead,
});
</script>

<template>
  <div class="container" :class="classObject">
    <span class="name">{{ character.name }}</span>
    <span class="initiativeCount">{{ character.initiative }}</span>
    <span v-if="character.armorClass" class="armorClass">{{ character.armorClass }}</span>

    <div class="health" :class="classObject">
      <div style="text-align: center">
        <span v-if="hasCurrent" class="hitPointsCurrent">{{ character.hitPointsCurrent }}</span>
        <span v-if="hasAll">/</span>
        <span v-if="hasMax" class="hitPointsMax">{{ character.hitPointsMax }}</span>
      </div>
      <CharacterHealth
        v-if="hasAll"
        class="health"
        :current="character.hitPointsCurrent!"
        :max="character.hitPointsMax!"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  border: 1px solid black;
  border-radius: 12px;
  padding: 12px 7px;
  font-size: 1em;

  display: grid;
  grid-template-columns: [first] 40px [line1] auto [middle] auto [line2] 40px [end];
  grid-template-rows: auto;
  place-items: stretch;

  position: relative;
  min-height: 2em;
  width: 100vw;
  box-sizing: border-box;

  @media (min-width: 600px) {
    width: 75vw;
  }

  & .name {
    grid-column-start: line1;
    grid-column-end: line2;
    grid-row-start: 1;
    grid-row-end: auto;

    text-align: center;

    .dead & {
      text-decoration: line-through;
    }
  }

  & .initiativeCount {
    display: none;
  }

  & .armorClass {
    background-image: url('data:image/svg+xml,<svg fill="%23000000" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M29.6,5.2C29.3,5,29,4.9,28.7,5.1c-4.3,1.4-8.7,0.3-12-2.8c-0.4-0.4-1-0.4-1.4,0c-3.3,3.1-7.7,4.2-12,2.8 C3,4.9,2.7,5,2.4,5.2S2,5.7,2,6c0,15.7,6.9,20.9,13.6,23.9C15.7,30,15.9,30,16,30s0.3,0,0.4-0.1C23.1,26.9,30,21.7,30,6 C30,5.7,29.8,5.4,29.6,5.2z"></path></g></svg>');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    height: 2em;
    aspect-ratio: 1;
    text-align: center;
    vertical-align: inherit;
    align-content: center;

    color: white;

    grid-column-start: first;
    grid-column-end: middle;
    grid-row-start: 2;
    grid-row-end: auto;
    place-self: center;
  }

  & .health {
    grid-column-start: middle;
    grid-column-end: end;
    grid-row-start: 2;
    grid-row-end: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
