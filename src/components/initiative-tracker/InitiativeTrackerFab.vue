<script setup lang="ts">
import { useHotkey } from "vuetify";
import { mdiUpdate } from "@mdi/js";
import { useInitiativeTracker } from "@state/InitiativeTrackerState.ts";
import type { VFab } from "vuetify/components";

import { VHotkey } from "vuetify/labs/VHotkey";

const { canAdvanceInitiative, advanceInitiative } = useInitiativeTracker();

useHotkey("ctrl+space", advanceInitiative);
</script>

<template>
  <v-tooltip location="top end" open-delay="500">
    <div>
      Avanza iniziatiza
      <v-hotkey keys="ctrl+space" variant="plain" platform="auto" />
    </div>

    <template v-slot:activator="{ props: activatorProps }">
      <v-fab
        v-if="canAdvanceInitiative"
        v-bind="activatorProps"
        :active="canAdvanceInitiative"
        location="bottom right"
        :icon="mdiUpdate"
        app
        @click="advanceInitiative"
      />
    </template>
  </v-tooltip>
</template>

<style scoped></style>
