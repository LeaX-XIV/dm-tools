import { NameGenerator, type GeneratorOptions } from "./MarkovModel";

const DEFAULT: Partial<GeneratorData> = {
  dataUri: null,
  generator: null,
  generatorOptions: {
    trainingData: [],
    order: 3,
    prior: 0.001,
  },
};

function newId(): string {
  return "AAAAAA";
}

function toDataUrl(dataUriPath?: string) {
  return dataUriPath
    ? new URL(`${import.meta.env.BASE_URL}/name-generator/${dataUriPath}`, import.meta.url)
    : DEFAULT.dataUri!;
}

export default class GeneratorData {
  id: string;
  name: string;
  dataUri: URL | null;
  generator: NameGenerator | null;
  generatorOptions: GeneratorOptions;

  constructor(name: string, dataUriPath?: string, id?: string, order?: number, prior?: number) {
    this.id = id ?? newId();
    this.name = name;
    this.dataUri = toDataUrl(dataUriPath);
    this.generator = DEFAULT.generator!;
    this.generatorOptions = {
      trainingData: DEFAULT.generatorOptions!.trainingData,
      order: order ?? DEFAULT.generatorOptions!.order,
      prior: prior ?? DEFAULT.generatorOptions!.prior,
    };
  }

  async buildGenerator() {
    await this.ensureTrainingData();

    this.generator = new NameGenerator(this.generatorOptions);
  }

  async ensureTrainingData() {
    if (this.generatorOptions.trainingData.length === 0) {
      if (this.dataUri === null) return;

      const data = await GeneratorData.loadTrainigData(this.dataUri);
      if (data === null) throw new Error();

      this.generatorOptions.trainingData = data;
    }
  }

  clone(): GeneratorData {
    const cloned = new GeneratorData("", "");

    cloned.id = this.id;
    cloned.name = this.name;
    cloned.dataUri = this.dataUri;
    cloned.generatorOptions = {
      trainingData: this.generatorOptions.trainingData,
      order: this.generatorOptions.order,
      prior: this.generatorOptions.prior,
    };

    cloned.generator = new NameGenerator(cloned.generatorOptions);

    return cloned;
  }

  static async loadTrainigData(uri: URL | string): Promise<string[] | null> {
    try {
      const response = await fetch(uri);
      if (!response.ok) return null;

      return (await response.json()) as string[];
    } catch (err: unknown) {
      console.error(err);
      return null;
    }
  }
}

export type GeneratorEditable = Pick<GeneratorData, "name" | "generatorOptions">;
