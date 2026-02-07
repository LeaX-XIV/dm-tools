import type { NameGenerator } from "./MarkovModel";

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
}
