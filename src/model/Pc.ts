import JsonSerializable from "@decorators/JsonSerializable";
import CurrentMax from "@model/CurrentMax";

interface SpellSlots {
  [1]?: CurrentMax;
  [2]?: CurrentMax;
  [3]?: CurrentMax;
  [4]?: CurrentMax;
  [5]?: CurrentMax;
  [6]?: CurrentMax;
  [7]?: CurrentMax;
  [8]?: CurrentMax;
  [9]?: CurrentMax;
}

@JsonSerializable
export default class Pc {
  private static MIN_SAFE_ID: number = 0;

  readonly id: number;
  name: string;

  hp: CurrentMax;
  tempHp: CurrentMax | null;

  spellSlots: SpellSlots | null;

  constructor(
    name: string,
    currentHp: number,
    maxHp: number,
    currentTempHp: number,
    maxTempHp: number,
    spellSlots: { current: number; max: number }[] | null,
    id?: number,
  ) {
    this.id = typeof id === "undefined" ? Pc.MIN_SAFE_ID : id;
    this.name = name;

    this.hp = new CurrentMax(currentHp, maxHp);
    this.tempHp = maxTempHp <= 0 ? null : new CurrentMax(currentTempHp, maxTempHp);

    if (!spellSlots) this.spellSlots = null;
    else if (spellSlots.length === 0) this.spellSlots = null;
    else
      this.spellSlots = {
        [1]: !spellSlots[0] ? undefined : new CurrentMax(spellSlots[0].current, spellSlots[0].max),
        [2]: !spellSlots[1] ? undefined : new CurrentMax(spellSlots[1].current, spellSlots[1].max),
        [3]: !spellSlots[2] ? undefined : new CurrentMax(spellSlots[2].current, spellSlots[2].max),
        [4]: !spellSlots[3] ? undefined : new CurrentMax(spellSlots[3].current, spellSlots[3].max),
        [5]: !spellSlots[4] ? undefined : new CurrentMax(spellSlots[4].current, spellSlots[4].max),
        [6]: !spellSlots[5] ? undefined : new CurrentMax(spellSlots[5].current, spellSlots[5].max),
        [7]: !spellSlots[6] ? undefined : new CurrentMax(spellSlots[6].current, spellSlots[6].max),
        [8]: !spellSlots[7] ? undefined : new CurrentMax(spellSlots[7].current, spellSlots[7].max),
        [9]: !spellSlots[8] ? undefined : new CurrentMax(spellSlots[8].current, spellSlots[8].max),
      };

    Pc.MIN_SAFE_ID = ++this.id;
  }
}
