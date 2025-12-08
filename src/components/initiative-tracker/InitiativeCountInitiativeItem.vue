<script setup lang="ts">
import InitiativeCount from "@model/InitiativeCount";

const { initiativeCount, active } = defineProps<{
  initiativeCount: InitiativeCount;
  active: boolean;
}>();
</script>

<template>
  <v-list-item class="mx-auto px-6" density="compact">
    <div class="d-flex align-center gc-1">
      <hr
        class="flex-grow-1"
        :class="`elevation-${active ? 3 : 0}`"
        :color="active ? 'primary' : 'error'"
      />

      <v-list-subheader
        :color="active ? 'primary' : 'error'"
        :title="initiativeCount.name ?? undefined"
      />

      <hr
        class="flex-grow-1"
        :class="`elevation-${active ? 3 : 0}`"
        :color="active ? 'primary' : 'error'"
      />
    </div>
  </v-list-item>
</template>

<style lang="scss" scoped></style>
