<script lang="ts" setup>
import { computed } from "vue";
import { useInitiativeTracker } from "@state/InitiativeTrackerState.ts";
import InitiativeCount from "@model/InitiativeCount";
import Creature from "@model/Creature";

import { mdiDeleteForever } from "@mdi/js";

const { initiatives, clearAll } = useInitiativeTracker();

const creatureCount = computed(() => initiatives.value.filter((i) => i instanceof Creature).length);
const initiativeCountCount = computed(
  () => initiatives.value.filter((i) => i instanceof InitiativeCount).length,
);

const canRemove = computed(() => creatureCount.value + initiativeCountCount.value > 0);

const removeTargetText = computed(() => {
  const creaturesText = `${creatureCount.value} creature`;
  const initiativeCountsText = `${initiativeCountCount.value} iniziative`;

  return [creaturesText, initiativeCountsText].filter((s) => !s.startsWith("0")).join(" e ");
});
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        :prepend-icon="mdiDeleteForever"
        :disabled="!canRemove"
        v-bind="activatorProps"
        block
        text="Elimina"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          L'operazione non può essere annullata.<br />
          Eliminare {{ removeTargetText }}?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="plain" text="Chiudi" @click="isActive.value = false" />
          <v-btn
            variant="tonal"
            color="error"
            text="Elimina"
            @click="
              clearAll();
              isActive.value = false;
            "
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<stype type="scss" scoped></stype>
