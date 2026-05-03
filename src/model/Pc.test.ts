import { fromJSON } from "@decorators/JsonSerializable";
import Pc from "./Pc";
import CurrentMax from "./CurrentMax";

describe("Playable Character", () => {
  test("to Json", () => {
    const pc = new Pc(
      "test",
      49,
      49,
      0,
      0,
      [
        { current: 2, max: 3 },
        { current: 4, max: 8 },
        { current: 2, max: 3 },
      ],
      42,
    );
    const parsed = JSON.parse(JSON.stringify(pc), fromJSON) as Pc;
    expect(parsed).toEqual(pc);
    expect(parsed).not.toHaveProperty("__type");

    expect(parsed.id).toBe(pc.id);

    if (parsed.hp !== null) expect(parsed.hp).toBeInstanceOf(CurrentMax);
    expect(parsed.hp).toEqual(pc.hp);

    if (parsed.tempHp !== null) expect(parsed.tempHp).toBeInstanceOf(CurrentMax);
    expect(parsed.tempHp).toEqual(pc.tempHp);
  });
});
