import { clamp as vuetifyClamp } from "vuetify/lib/util/helpers.mjs";
import clamp from "./clamp";

describe("vuetifyClamp", () => {
  test("min only over", () => expect(vuetifyClamp(1, 0)).toBe(1));
  test("min only below", () => expect(vuetifyClamp(-1, 0)).toBe(0));
  test("min-max", () => expect(vuetifyClamp(1, 0, 10)).toBe(1));
  test("min-max over", () => expect(vuetifyClamp(11, 0, 10)).toBe(10));
  test("min-max below", () => expect(vuetifyClamp(-1, 0, 10)).toBe(0));
  test("stupid min default", () => expect(vuetifyClamp(-1)).toBe(0));
  test("stupid max default", () => expect(vuetifyClamp(10, 0)).toBe(1));
});

describe("clamp", () => {
  test("min only over", () => expect(clamp(1, 0)).toBe(1));
  test("min only below", () => expect(clamp(-1, 0)).toBe(0));
  test("min-max", () => expect(clamp(1, 0, 10)).toBe(1));
  test("min-max over", () => expect(clamp(11, 0, 10)).toBe(10));
  test("min-max below", () => expect(clamp(-1, 0, 10)).toBe(0));
  test("stupid min default", () => expect(clamp(-1)).toBe(-1));
  test("stupid max default", () => expect(clamp(10, 0)).toBe(10));
});
