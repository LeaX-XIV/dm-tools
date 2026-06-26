<script setup lang="ts">
import { computed } from "vue";

const currentSpellSlots = defineModel<number>({ required: true });
const { maxSpellSlots, spellSlotsLevel } = defineProps<{
  maxSpellSlots: number;
  spellSlotsLevel: string;
}>();

const range = computed(() =>
  Array(maxSpellSlots)
    .fill(0)
    .map((_, i) => i),
);

defineExpose({
  maxSpellSlots,
});
</script>

<template>
  <v-number-input
    :label="`Livello ${spellSlotsLevel}`"
    control-variant="split"
    variant="outlined"
    flat
    hide-details
    v-model="currentSpellSlots"
    :min="0"
    :max="maxSpellSlots"
  />
  <ul class="spell-slot-container">
    <li v-for="i in range" :key="i" :active="i < currentSpellSlots" class="spell-slot"></li>
  </ul>
</template>

<style lang="scss" scoped>
@import "../../../styles/radial.scss";
.spell-slot-container {
  @include on-circle($item-count: 4, $circle-size: 2.2em, $item-size: 1em);
  margin: -13.7% auto 0;
  animation: spin 5s linear infinite;

  @media screen and (prefers-reduced-motion: reduce) {
    animation: none;
  }

  .spell-slot {
    display: block;
    max-width: 100%;
    border-radius: 50%;
    transition: 0.15s;
    text-align: center;

    &:before {
      content: "*";
    }

    &[active="false"] {
      opacity: 0.5;
    }
  }
}

// Spin it, baby!
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
