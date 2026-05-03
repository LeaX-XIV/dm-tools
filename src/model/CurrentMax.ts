import JsonSerializable from "@/decorators/JsonSerializable";
import clamp from "@utils/clamp";

@JsonSerializable
export default class CurrentMax {
  private _min: number = 0;
  private _max: number = 0;
  private _current: number = 0;

  constructor(current: number, max: number = Number.MAX_SAFE_INTEGER, min: number = 0) {
    this.min = min;
    this.max = max;
    this.current = current;
  }

  set min(v: number) {
    this._min = clamp(v);
    this.max = this.max;
  }

  get min(): number {
    return this._min;
  }

  set max(v: number) {
    this._max = clamp(v, this.min);
    this.current = this.current;
  }

  get max(): number {
    return this._max;
  }

  set current(v: number) {
    this._current = clamp(v, this.min, this.max);
  }

  get current(): number {
    return this._current;
  }

  isFull(): boolean {
    return this.current === this.max;
  }

  isEmpty(): boolean {
    return this.current === this.min;
  }

  add(n: number): CurrentMax {
    if (n > 0) this.modify(n);
    return this;
  }

  remove(n: number): CurrentMax {
    if (n > 0) this.modify(-n);
    return this;
  }

  private modify(delta: number): number {
    const prev = this.current;
    this.current += delta;
    return this.current - prev;
  }
}
