<script setup lang="ts">
import { computed } from "vue";
import CreatureForm from "./CreatureForm.vue";

import { VIconBtn } from "vuetify/labs/VIconBtn";

import { mdiSquareEditOutline } from "@mdi/js";

const { isActive, isPlayer } = defineProps<{
  isActive: boolean;
  isPlayer: boolean;
}>();

const name = defineModel<string>("name", { required: true });
const initiative = defineModel<number>("initiaitve", { required: true });
const armorClass = defineModel<number | null>("armorClass", { default: null });
const hitPointsCurrent = defineModel<number | null>("hitPointsCurrent", { default: null });
const hitPointsMax = defineModel<number | null>("hitPointsMax", { default: null });

const hasArmorClass = computed(() => armorClass.value !== null);
const hasCurrentHp = computed(() => hitPointsCurrent.value !== null);
const hasMaxHp = computed(() => hitPointsMax.value !== null);

const hasAllHp = computed(() => hasCurrentHp.value && hasMaxHp.value);

function edit(
  newIsPlayer: boolean,
  newName: string,
  newInitiative: number,
  newArmorClass: number | null,
  newHitPointsCurrent: number | null,
  newHitPointsMax: number | null,
  newNumber: number,
) {
  name.value = newName;
  initiative.value = newInitiative;
  armorClass.value = newArmorClass;
  hitPointsCurrent.value = newHitPointsCurrent;
  hitPointsMax.value = newHitPointsMax;
}

const isDead = computed<boolean>(
  () => hitPointsCurrent.value !== null && hitPointsCurrent.value <= 0,
);
</script>

<template>
  <v-list-item class="mx-auto px-6 py-3" :elevation="isDead ? 0 : 3">
    <v-hover v-slot="{ isHovering, props: hoverProps }">
      <div v-bind="hoverProps">
        <span>{{ name }}</span>

        <v-dialog max-width="600" persistent>
          <template v-slot:activator="{ props: activatorProps, isActive: isDialogActive }">
            <v-icon-btn
              v-bind="activatorProps"
              :icon="mdiSquareEditOutline"
              :style="{ visibility: isHovering || isDialogActive ? undefined : 'hidden' }"
              opacity="50%"
            />
          </template>

          <template v-slot:default="{ isActive: isDialogOpen }">
            <v-card :title="`Modifica ${name}`">
              <CreatureForm
                :is-player="isPlayer"
                :name="name"
                :initiative="initiative"
                :armor-class="armorClass ?? undefined"
                :hit-points-current="hitPointsCurrent ?? undefined"
                :hit-points-max="hitPointsMax ?? undefined"
                @confirm="edit"
                @cancel="isDialogOpen.value = false"
              />
            </v-card>
          </template>
        </v-dialog>
      </div>
    </v-hover>

    <template v-slot:prepend>
      <v-icon v-if="isDead" icon="$dead" />

      <v-badge
        v-else-if="hasArmorClass"
        :color="isActive ? 'primary' : 'error'"
        :content="armorClass!"
      >
        <v-icon icon="$initiative" />
      </v-badge>

      <v-icon v-else-if="!isPlayer" icon="$monster" />

      <v-icon v-else icon="$hero" />
    </template>

    <template v-slot:append>
      <v-number-input
        v-if="!isPlayer && hasCurrentHp"
        label="HP"
        control-variant="split"
        variant="outlined"
        flat
        hide-details
        v-model="hitPointsCurrent"
        :min="0"
        :max="hitPointsMax ?? undefined"
        :suffix="hasAllHp ? ` / ${hitPointsMax}` : undefined"
      />
    </template>
  </v-list-item>
</template>

<style lang="scss" scoped></style>
