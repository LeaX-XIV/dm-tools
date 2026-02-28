import { NameGenerator } from "./MarkovModel";

const DEFAULT: Partial<GeneratorData> = {
  data: null,
  dataUri: null,
  generator: null,
  generatorOptions: {
    order: 3,
    prior: 0.001,
  },
};

function newId(): string {
  return "AAAAAA";
}

export default class GeneratorData {
  id: string;
  name: string;
  data: string[] | null;
  dataUri: URL | null;
  generator: NameGenerator | null;
  generatorOptions: {
    order: number;
    prior: number;
  };

  constructor(name: string, dataUriPath: string, id?: string, order?: number, prior?: number) {
    this.id = id ?? newId();
    this.name = name;
    this.data = DEFAULT.data!;
    this.dataUri = new URL(
      `${import.meta.env.BASE_URL}/name-generator/${dataUriPath}`,
      import.meta.url,
    );
    this.generator = DEFAULT.generator!;
    this.generatorOptions = {
      order: order ?? DEFAULT.generatorOptions!.order,
      prior: prior ?? DEFAULT.generatorOptions!.prior,
    };
  }

  async buildGenerator() {
    await this.ensureTrainingData();

    this.generator = new NameGenerator(
      this.data!,
      this.generatorOptions.order,
      this.generatorOptions.prior,
    );
  }

  async ensureTrainingData() {
    if (this.data === null) {
      if (this.dataUri === null) throw new Error();

      const data = await GeneratorData.loadTrainigData(this.dataUri);
      if (data === null) throw new Error();

      this.data = data;
    }
  }

  clone(): GeneratorData {
    const cloned = new GeneratorData("", "");

    cloned.id = this.id;
    cloned.name = this.name;
    cloned.data = this.data;
    cloned.dataUri = this.dataUri;
    cloned.generatorOptions = {
      order: this.generatorOptions.order,
      prior: this.generatorOptions.prior,
    };

    cloned.generator = new NameGenerator(
      cloned?.data ?? [],
      cloned.generatorOptions.order,
      cloned.generatorOptions.prior,
    );

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
