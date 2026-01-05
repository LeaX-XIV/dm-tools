import { uniform } from "@utils/random";

type Char = string;
type ExplodedString = Char[];

export class NameGenerator {
  model: MarkovModel;

  constructor(trainingData: string[], order: number = 3, prior: number = 0.001) {
    const names = new Set<string>();
    const support = new Set<string>();

    for (let datum of trainingData) {
      datum = datum.trim();
      if (datum.length === 0) continue;

      names.add(datum);
      datum.split("").forEach((a) => support.add(a));
    }

    this.model = new MarkovModel(support, order, prior);

    for (const name of names) this.model.observe(name);
  }

  generate(): string {
    return this.model.generate().join("");
  }
}

class Categorical {
  counts: Map<string, number>;
  total: number;

  constructor(support: Iterable<Char>, prior: number) {
    this.counts = new Map<string, number>([...support].map((c: Char) => [c, prior]));
    this.total = [...this.counts.values()].reduce((a, b) => a + b, 0);
  }

  observe(event: string, count: number = 1): void {
    const prevValue = this.counts.get(event) ?? 0;
    this.counts.set(event, prevValue + count);
    this.total += count;
  }

  sample(dice: (min: number, max: number) => number = uniform): string {
    if (this.counts.size === 0) throw new Error("Categorical not initialized");

    let sample = dice(0, this.total);
    let lastEvent: string;
    for (const [event, count] of this.counts.entries()) {
      lastEvent = event;
      if (sample <= count) return event;
      sample -= count;
    }
    return lastEvent!;
  }
}

export class MarkovModel {
  support: Set<string>;
  order: number;
  prior: number;
  boundary: string;
  prefix: Char[];
  postfix: Char[];
  counts: Map<string, Categorical>;

  constructor(support: Iterable<string>, order: number, prior: number, boundary_symbol?: string) {
    this.support = new Set<string>(support);
    this.order = Math.ceil(order);
    this.prior = prior;
    this.boundary = boundary_symbol ?? "#";
    this.prefix = Array(this.order).fill(this.boundary);
    this.postfix = [this.boundary];
    this.counts = new Map<string, Categorical>();

    this.support.add(this.boundary);
  }

  observe(sequence: string, count: number = 1): void {
    const seqList = this.prefix.concat([...sequence], this.postfix);

    for (let i = this.order; i < seqList.length; ++i) {
      const context = seqList.slice(i - this.order, i);
      const event = seqList[i]!;
      for (let j = 0; j <= context.length; ++j)
        this.categorical(context.slice(j)).observe(event, count);
    }
  }

  sample(context: ExplodedString): Char {
    context = this.backoff(context);
    return this.categorical(context).sample();
  }

  generate(): ExplodedString {
    const sequence: ExplodedString = [this.sample(this.prefix)];
    while (sequence[sequence.length - 1] !== this.boundary) {
      sequence.push(this.sample(sequence));
    }

    sequence.pop();
    return sequence;
  }

  private categorical(context: ExplodedString): Categorical {
    const key = context.join("");

    if (!this.counts.has(key)) this.counts.set(key, new Categorical(this.support, this.prior));

    return this.counts.get(key)!;
  }

  private backoff(context: ExplodedString): ExplodedString {
    let ctx = [...context];
    if (ctx.length > this.order) ctx = ctx.slice(-this.order);
    else if (ctx.length < this.order)
      ctx.unshift(...Array(this.order - ctx.length).fill(this.boundary));

    while (!this.counts.has(ctx.join("")) && ctx.length > 0) ctx.shift();

    return ctx;
  }
}
