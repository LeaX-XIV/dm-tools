import CurrentMax from "./CurrentMax";

describe("CurrentMax", () => {
  test("init", () => expect(new CurrentMax(1, 10)).toEqual({ _min: 0, _max: 10, _current: 1 }));
  test("init below", () =>
    expect(new CurrentMax(-1, 10)).toEqual({ _min: 0, _max: 10, _current: 0 }));
  test("init over", () =>
    expect(new CurrentMax(11, 10)).toEqual({ _min: 0, _max: 10, _current: 10 }));

  test("init with min", () =>
    expect(new CurrentMax(7, 10, 5)).toEqual({ _min: 5, _max: 10, _current: 7 }));
  test("init over with min", () =>
    expect(new CurrentMax(11, 10, 5)).toEqual({ _min: 5, _max: 10, _current: 10 }));
  test("init below with min", () =>
    expect(new CurrentMax(1, 10, 5)).toEqual({ _min: 5, _max: 10, _current: 5 }));

  test("init max below min", () =>
    expect(new CurrentMax(1, -5)).toEqual({ _min: 0, _max: 0, _current: 0 }));
  test("init zero", () =>
    expect(new CurrentMax(0, 0, 0)).toEqual({ _min: 0, _max: 0, _current: 0 }));
  test("min safe int", () =>
    expect(new CurrentMax(1, 10, Number.MIN_SAFE_INTEGER - 1)).toEqual({
      _min: Number.MIN_SAFE_INTEGER,
      _max: 10,
      _current: 1,
    }));
  test("max safe int", () =>
    expect(new CurrentMax(1, Number.MAX_SAFE_INTEGER + 1)).toEqual({
      _min: 0,
      _max: Number.MAX_SAFE_INTEGER,
      _current: 1,
    }));

  test("add in limit", () =>
    expect(new CurrentMax(1, 10).add(3)).toEqual({ _min: 0, _max: 10, _current: 4 }));
  test("add negative", () =>
    expect(new CurrentMax(1, 10).add(-3)).toEqual({ _min: 0, _max: 10, _current: 1 }));
  test("remove in limit", () =>
    expect(new CurrentMax(5, 10).remove(3)).toEqual({ _min: 0, _max: 10, _current: 2 }));
  test("remove negative", () =>
    expect(new CurrentMax(5, 10).remove(-3)).toEqual({ _min: 0, _max: 10, _current: 5 }));

  test("add over limit", () =>
    expect(new CurrentMax(1, 10).add(20)).toEqual({ _min: 0, _max: 10, _current: 10 }));
  test("remove over limit", () =>
    expect(new CurrentMax(5, 10).remove(20)).toEqual({ _min: 0, _max: 10, _current: 0 }));

  test("isEmpty true", () => expect(new CurrentMax(0, 10)).toSatisfy((actual) => actual.isEmpty()));
  test("isEmpty false", () =>
    expect(new CurrentMax(1, 10)).toSatisfy((actual) => !actual.isEmpty()));
  test("isFull true", () => expect(new CurrentMax(10, 10)).toSatisfy((actual) => actual.isFull()));
  test("isFull false", () => expect(new CurrentMax(1, 10)).toSatisfy((actual) => !actual.isFull()));

  test("max change higher", () => {
    const actual = new CurrentMax(5, 10, -3);
    actual.max = 20;
    expect(actual).toEqual({ _min: -3, _max: 20, _current: 5 });
  });
  test("max change lower bounded", () => {
    const actual = new CurrentMax(5, 10, -3);
    actual.max = 7;
    expect(actual).toEqual({ _min: -3, _max: 7, _current: 5 });
  });
  test("max change lower unbounded", () => {
    const actual = new CurrentMax(5, 10, -3);
    actual.max = 1;
    expect(actual).toEqual({ _min: -3, _max: 1, _current: 1 });
  });
  test("max change lower than min", () => {
    const actual = new CurrentMax(5, 10, -3);
    actual.max = -5;
    expect(actual).toEqual({ _min: -3, _max: -3, _current: -3 });
  });

  test("min change lower", () => {
    const actual = new CurrentMax(5, 10, 0);
    actual.min = -5;
    expect(actual).toEqual({ _min: -5, _max: 10, _current: 5 });
  });
  test("min change higher bounded", () => {
    const actual = new CurrentMax(5, 10, 0);
    actual.min = 3;
    expect(actual).toEqual({ _min: 3, _max: 10, _current: 5 });
  });
  test("min change higher unbounded", () => {
    const actual = new CurrentMax(5, 10, 0);
    actual.min = 7;
    expect(actual).toEqual({ _min: 7, _max: 10, _current: 7 });
  });
  test("min change higher than max", () => {
    const actual = new CurrentMax(5, 10, 0);
    actual.min = 20;
    expect(actual).toEqual({ _min: 20, _max: 20, _current: 20 });
  });
});
