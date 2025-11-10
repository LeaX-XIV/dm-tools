export default class InitiativeCount {
  initiative: number;
  name: string | null;

  constructor(initiative: number, name?: string) {
    this.initiative = initiative;
    this.name = name ?? null;
  }
}
