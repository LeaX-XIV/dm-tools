<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { VForm } from "vuetify/components";
import { useEditable } from "@/composables/useEditable";
import type { GeneratorEditable } from "@model/GeneratorData";

interface Props {
  generator: Omit<GeneratorEditable, "genetator">;
}

interface Emits {
  (e: "save", generator: GeneratorEditable): void;
}

const { generator } = defineProps<Props>();
const emit = defineEmits<Emits>();

const form = ref<VForm>();

const generatorName = ref<string>(generator.name);
const dictionaryString = ref<string>(generator.generatorOptions.trainingData.join(" "));
const generatorOrder = ref<number>(generator.generatorOptions.order);
const generatorPrior = ref<number>(generator.generatorOptions.prior);

const dictionaryArray = computed(() => dictionaryString.value.split(/\s+/gm));

const { isDirty, reset: resetDirty } = useEditable(
  generatorName,
  dictionaryArray,
  generatorOrder,
  generatorPrior,
);

onMounted(reset);

async function reset() {
  generatorName.value = generator.name;
  dictionaryString.value = generator.generatorOptions.trainingData.join(" ");
  generatorOrder.value = generator.generatorOptions.order;
  generatorPrior.value = generator.generatorOptions.prior;

  resetDirty();
  form.value?.resetValidation();
}

function submit() {
  if (!isDirty.value) {
    emit("save", generator);

    resetDirty();

    return;
  }

  if (!form.value?.isValid) return;

  emit("save", {
    name: generatorName.value,
    generatorOptions: {
      trainingData: dictionaryArray.value,
      order: generatorOrder.value,
      prior: generatorPrior.value,
    },
  });

  resetDirty();
}
</script>

<template>
  <v-form alidate-on="invalid-input" @submit.prevent="submit" ref="form">
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Nome" v-model.lazy.trim="generatorName" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea label="Dati" v-model.lazy.trim="dictionaryString" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-slider
            label="Order"
            v-model.lazy="generatorOrder"
            min="1"
            :max="Math.max(...dictionaryArray.map((el) => el.length))"
            step="1"
            show-ticks
            thumb-label
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-slider
            label="Prior"
            v-model.lazy="generatorPrior"
            min="0"
            max="0.05"
            step="0.001"
            thumb-label
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer />
      <v-btn type="reset" text="Resetta" variant="plain" @click.stop.prevent="reset" />
      <v-btn type="submit" color="primary" text="Salva" variant="tonal" />
    </v-card-actions>
  </v-form>
</template>

<style lang="scss" scoped></style>
