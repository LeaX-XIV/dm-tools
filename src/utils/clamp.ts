import { clamp as vuetifyClamp } from "vuetify/lib/util/helpers.mjs";
export default function clamp(
  value: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
): number {
  return vuetifyClamp(value, min, max);
}
