export default class Creature {
  name: string;
  initiative: number;

  armorClass: number | null;
  hitPointsMax: number | null;
  hitPointsCurrent: number | null;

  constructor(
    name: string,
    initiative: number,
    armorClass?: number,
    hitPointsMax?: number,
    hitPointsCurrent?: number,
  ) {
    this.name = name;
    this.initiative = initiative;

    this.armorClass = armorClass ?? null;
    this.hitPointsMax = hitPointsMax ?? null;
    this.hitPointsCurrent = hitPointsCurrent ?? null;
  }

  get isDead(): boolean {
    return this.hitPointsCurrent !== null && this.hitPointsCurrent <= 0;
  }

  jsonReplacer() {
    return { ...this, __type: this.constructor.name };
  }
}
