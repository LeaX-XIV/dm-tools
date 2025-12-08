<script setup lang="ts">
import { ref } from "vue";
import CreatureForm from "./CreatureForm.vue";
import Creature from "@model/Creature";

const emit = defineEmits<{
  (e: "new-creature", creature: Creature): void;
}>();

const open = ref(false);

function save(
  isPlayer: boolean,
  name: string,
  initiative: number,
  armorClass: number | null,
  hitPointsCurrent: number | null,
  hitPointsMax: number | null,
  number: number,
) {
  const count = number;
  for (let i = 0; i < count; ++i) {
    emit(
      "new-creature",
      new Creature(
        isPlayer ? name : `${name} ${i + 1}`,
        initiative,
        armorClass ? Number(armorClass) : undefined,
        hitPointsMax ? Number(hitPointsMax) : undefined,
        hitPointsCurrent ? Number(hitPointsCurrent) : undefined,
        isPlayer,
      ),
    );
  }

  open.value = false;
}
</script>

<template>
  <v-btn prepend-icon="$creature" block @click.stop.prevent="open = true">Creatura</v-btn>

  <v-dialog v-model="open" max-width="600" persistent>
    <v-card title="Creatura">
      <CreatureForm @confirm="save" @cancel="open = false" />
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
