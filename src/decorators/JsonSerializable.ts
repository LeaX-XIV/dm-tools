// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type Constructor = Function;

const TYPE_KEY = "__type";

const serializables: Map<string, Constructor> = new Map();

export default function JsonSerializable(constructorDecorator: Constructor) {
  // classId may change with every build
  const classId = constructorDecorator.name;

  serializables.set(classId, constructorDecorator);

  constructorDecorator.prototype.toJSON = toJSON;
}

function toJSON(this: object): object & { [TYPE_KEY]: string } {
  const typeString: string = this.constructor.name;
  return { [TYPE_KEY]: typeString, ...this };
}

export function fromJSON(_: string, val: unknown) {
  if (val === null || typeof val === "undefined") return val;

  if (typeof val !== "object") return val;

  let constructor;
  if (TYPE_KEY in val && typeof val[TYPE_KEY] === "string") {
    constructor = serializables.get(val[TYPE_KEY]);
  }

  if (constructor) {
    return construct(constructor, val as { [key: string]: unknown });
  }

  return val;
}

function construct(constructor: Constructor, values: { [key: string]: unknown }) {
  const emptyObj = Reflect.construct(constructor, []);

  for (const [name, value] of Object.entries(values)) {
    if (name === TYPE_KEY) continue;

    emptyObj[name] = value;
  }

  return emptyObj;
}
