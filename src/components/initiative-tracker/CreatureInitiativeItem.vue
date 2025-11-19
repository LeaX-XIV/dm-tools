<script setup lang="ts">
import { computed } from "vue";
import Creature from "@model/Creature";

import { mdiSkull, mdiShield } from "@mdi/js";

const emit = defineEmits<{
  (e: "update-hit-points-current", newHitPoints: number | null): void;
}>();

const { creature } = defineProps<{ creature: Creature }>();

const hasArmorClass = computed(() => creature.armorClass !== null);
const hasCurrentHp = computed(() => creature.hitPointsCurrent !== null);
const hasMaxHp = computed(() => creature.hitPointsMax !== null);
const hasAllHp = computed(() => hasCurrentHp.value && hasMaxHp.value);

const currentHp = computed({
  get: () => creature.hitPointsCurrent,
  set: (value: number) => emit("update-hit-points-current", value),
});

const isDead = computed(() => creature.isDead);
</script>

<template>
  <v-list-item class="mx-1 my-2 py-3" :elevation="isDead ? 0 : 2">
    <v-list-item-title>{{ creature.name }}</v-list-item-title>

    <template v-slot:prepend>
      <v-icon v-if="isDead">{{ mdiSkull }}</v-icon>

      <v-badge v-else-if="hasArmorClass" color="error" :content="creature.armorClass!">
        <v-icon>{{ mdiShield }}</v-icon>
      </v-badge>
    </template>

    <template v-slot:append>
      <v-number-input
        v-if="hasCurrentHp"
        label="HP"
        control-variant="split"
        variant="outlined"
        flat
        hide-details
        v-model="currentHp"
        :min="0"
        :max="creature.hitPointsMax ?? undefined"
        :suffix="hasAllHp ? ` / ${creature.hitPointsMax}` : undefined"
      />
    </template>
  </v-list-item>
</template>

<style lang="scss" scoped></style>
