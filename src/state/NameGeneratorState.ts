import { computed, reactive, ref } from "vue";
import GeneratorData, { type GeneratorEditable } from "@model/GeneratorData";

const generators = reactive(new Map<string, GeneratorData>());
const selected = ref<GeneratorData | null>(null);

function addGenerator(id: string, name: string, dataUriPath: string) {
  generators.set(id, new GeneratorData(name, dataUriPath, id));

  if (generators.size === 1) select(id);
}

async function update(newCategory: GeneratorEditable) {
  if (selected.value === null) return;

  if (!generators.has(selected.value.id)) return;

  const generator = generators.get(selected.value.id)!;
  generator.name = newCategory.name;
  generator.generatorOptions.trainingData = newCategory.generatorOptions.trainingData;
  generator.generatorOptions.order = newCategory.generatorOptions.order;
  generator.generatorOptions.prior = newCategory.generatorOptions.prior;

  await generator.buildGenerator();

  select(selected.value.id);
}

function select(id: string): boolean {
  const newGeneratorData = generators.get(id) ?? null;
  selected.value = newGeneratorData;
  return selected.value === null;
}

async function generate(): Promise<string | null> {
  if (selected.value === null) return null;

  if (selected.value.generator === null) await selected.value.buildGenerator();

  return selected.value.generator!.generate();
}

addGenerator("JP001", "Cognomi JP", "japanese-family-names.json");

export function useNameGenerator() {
  return {
    list: computed(() => [...generators.entries()].map(([k, v]) => ({ id: k, name: v.name }))),
    selected: computed(() =>
      !selected.value
        ? null
        : {
            id: selected.value!.id,
            name: selected.value!.name,
          },
    ),

    get: (id: string) => generators.get(id),
    select: select,
    update: update,

    generate: generate,
  };
}
