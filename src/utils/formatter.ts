type Alphabet = string[];

const CHARS_ALPHABET: Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Converts a positive integer number (including 0) to a string, following the English alphabet.
 * If the  conversion cannot be done, an empty string is returned.
 * @examples
 * ```
 * intToLetters(0); // "A"
 * intToLetters(3); // "C"
 * intToLetters(26); // "AA"
 * ```
 * @examples
 * ```
 * intToLetters(-10); // ""
 * intToLetters(3.14); // ""
 * ```
 */
export function intToLetters(num: number): string {
  return intToAlphabet(num, CHARS_ALPHABET);
}

function intToAlphabet(num: number, alphabet: Alphabet): string {
  const numInAlphabetBase = changeBase(num, alphabet.length);
  if (numInAlphabetBase.length == 0) return num.toFixed(0);

  return numInAlphabetBase.map((index) => alphabet[index]).join("");
}

function changeBase(num: number, newBase: number): number[] {
  if (!Number.isInteger(num)) return [];

  if (num < 0) return [];

  if (!Number.isInteger(newBase)) return [];

  if (newBase <= 1) return [];

  const converted = [];
  do {
    const q = Math.floor(num / newBase);
    const r = num % newBase;

    converted.push(r);
    num = q;
  } while (num > 1);

  return converted;
}
