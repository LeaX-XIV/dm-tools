import { intToLetters } from "./formatter";

describe("intToLetters", () => {
  test("single character", () => expect(intToLetters(0)).toBe("A"));
  test("single character", () => expect(intToLetters(1)).toBe("B"));
  test("single character", () => expect(intToLetters(5)).toBe("F"));
  test("double characters", () => expect(intToLetters(26)).toBe("AA"));
  test("triple characters", () => expect(intToLetters(26 * 26)).toBe("AAA"));
  test("quadruple characters", () => expect(intToLetters(26 * 26 * 26)).toBe("AAAA"));
  test("random number", () => expect(intToLetters(429)).toBe("PN"));

  test("decimal", () => expect(intToLetters(3.14)).toBe(""));
  test("small decimal", () => expect(intToLetters(0.00001)).toBe(""));
  test("negative", () => expect(intToLetters(-34)).toBe(""));
  test("small negative decimal", () => expect(intToLetters(-0.00001)).toBe(""));
  test("infinity", () => expect(intToLetters(Infinity)).toBe(""));
  test("negative infinity", () => expect(intToLetters(-Infinity)).toBe(""));
  test("not a number", () => expect(intToLetters(NaN)).toBe(""));
});
