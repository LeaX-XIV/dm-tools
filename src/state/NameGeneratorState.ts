import { computed, ref } from "vue";
import GeneratorData from "@model/GeneratorData";
import { NameGenerator } from "@model/MarkovModel";

const categories = new Map<string, GeneratorData>();

function addCategory(id: string, name: string, dataUriPath: string) {
  categories.set(id, new GeneratorData(name, dataUriPath, id));
}

const selectedGenerator = ref<GeneratorData | null>(null);

async function loadTrainigData(uri: URL | string): Promise<string[] | null> {
  try {
    const response = await fetch(uri);
    if (!response.ok) return null;

    return (await response.json()) as string[];
  } catch (err: unknown) {
    console.error(err);
    return null;
  }
}

function selectGenerator(id: string): boolean {
  const newGeneratorData = categories.get(id) ?? null;
  selectedGenerator.value = newGeneratorData;
  return selectedGenerator.value === null;
}

async function generate(): Promise<string | null> {
  if (selectedGenerator.value === null) return null;

  if (selectedGenerator.value.generator === null) {
    if (selectedGenerator.value.data === null) {
      if (selectedGenerator.value.dataUri === null) return null;

      const data = await loadTrainigData(selectedGenerator.value.dataUri);
      if (data === null) return null;

      selectedGenerator.value.data = data;
    }

    selectedGenerator.value.generator = new NameGenerator(
      selectedGenerator.value.data,
      selectedGenerator.value.generatorOptions.order,
      selectedGenerator.value.generatorOptions.prior,
    );
  }

  return selectedGenerator.value.generator.generate();
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

    generate: generate,
  };
}
