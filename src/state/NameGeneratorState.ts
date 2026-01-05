import { NameGenerator } from "@model/MarkovModel";

let generator: NameGenerator;

async function loadTrainigData(): Promise<string[] | null> {
  try {
    const url = new URL("/assets/name-generator/japanese-family-names.json", import.meta.url).href;
    const response = await fetch(url);
    if (!response.ok) return null;

    return (await response.json()) as string[];
  } catch (err: unknown) {
    console.error(err);
    return null;
  }
}

export async function useNameGenerator() {
  if (typeof generator === "undefined") {
    const trainingData = await loadTrainigData();
    if (trainingData === null) throw new Error("Could not load data");
    generator = new NameGenerator(trainingData);
  }

  return {
    generate: generator.generate.bind(generator),
  };
}
