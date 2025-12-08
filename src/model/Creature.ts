import JsonSerializable from "@decorators/JsonSerializable";

@JsonSerializable
export default class Creature {
  name: string;
  initiative: number;

  armorClass: number | null;
  hitPointsMax: number | null;
  hitPointsCurrent: number | null;

  isPlayer: boolean;

  constructor(
    name: string,
    initiative: number,
    armorClass?: number,
    hitPointsMax?: number,
    hitPointsCurrent?: number,
    isPlayer?: boolean,
  ) {
    this.name = name;
    this.initiative = initiative;

    this.armorClass = armorClass ?? null;
    this.hitPointsMax = hitPointsMax ?? null;
    this.hitPointsCurrent = hitPointsCurrent ?? null;

    this.isPlayer = isPlayer ?? false;
  }

  get isDead(): boolean {
    return this.hitPointsCurrent !== null && this.hitPointsCurrent <= 0;
  }
}
