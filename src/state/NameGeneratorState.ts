import { computed, reactive, ref } from "vue";
import GeneratorData from "@model/GeneratorData";

const categories = reactive(new Map<string, GeneratorData>());

function addCategory(id: string, name: string, dataUriPath: string) {
  categories.set(id, new GeneratorData(name, dataUriPath, id));
}

function updateSelectedCategory(newCategory: GeneratorData) {
  if (!categories.has(newCategory.id)) return;

  categories.delete(newCategory.id);
  categories.set(newCategory.id, newCategory);

  selectGenerator(newCategory.id);
}

const selectedGenerator = ref<GeneratorData | null>(null);

function selectGenerator(id: string): boolean {
  const newGeneratorData = categories.get(id) ?? null;
  selectedGenerator.value = newGeneratorData;
  return selectedGenerator.value === null;
}

async function generate(): Promise<string | null> {
  if (selectedGenerator.value === null) return null;

  if (selectedGenerator.value.generator === null) await selectedGenerator.value.buildGenerator();

  return selectedGenerator.value.generator!.generate();
}

addCategory("JP001", "Cognomi JP", "japanese-family-names.json");

export function useNameGenerator() {
  selectGenerator("JP001");

  return {
    generatorsList: [...categories.entries()].map(([k, v]) => ({ id: k, name: v.name })),
    selectedGenerator: computed(() =>
      !selectedGenerator.value
        ? null
        : {
            id: selectedGenerator.value!.id,
            name: selectedGenerator.value!.name,
          },
    ),
    selectGenerator: selectGenerator,
    updateSelectedCategory: updateSelectedCategory,

    generate: generate,
  };
}
