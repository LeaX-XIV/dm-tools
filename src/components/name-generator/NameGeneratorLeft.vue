<script setup lang="ts">
import { reactive, ref } from "vue";

import { mdiPencil } from "@mdi/js";
import { useNameGenerator } from "@state/NameGeneratorState";
import GeneratorForm from "./GeneratorForm.vue";
import type { GeneratorEditable } from "@model/GeneratorData";

const generator = reactive(useNameGenerator());

const open = ref(false);

async function onOpenDialog() {
  if (generator.selected === null) return;
  const gen = generator.get(generator.selected.id);
  if (!gen) return;

  await gen.ensureTrainingData();
  open.value = true;
}

async function onCloseDialog(newOptions: GeneratorEditable) {
  generator.update(newOptions);
  open.value = false;
}
</script>

<template>
  <v-btn-group direction="vertical" style="width: 100%">
    <v-btn
      v-for="g of generator.list"
      v-bind:key="g.id"
      :active="g.id === generator.selected?.id"
      :text="g.name"
      @click.stop.prevent="generator.select(g.id)"
    >
      <template v-slot:append v-if="g.id === generator.selected?.id">
        <v-icon :icon="mdiPencil" @click="onOpenDialog" />
        <v-dialog v-model="open" max-width="800" persistent>
          <v-card :title="`${g.id} - ${g.name}`">
            <GeneratorForm :generator="generator.get(g!.id)!" @save="onCloseDialog" />
          </v-card>
        </v-dialog>
      </template>
    </v-btn>
  </v-btn-group>
</template>

<style lang="scss" scoped></style>
