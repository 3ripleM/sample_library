const symbol: unique symbol = Symbol();
export interface Branded<key extends string> {
  [symbol]: { [k in key]: true };
}

export type Brand<a, key extends string> = a & Branded<key>;

export namespace Brand {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export type un<A extends Branded<string>> = string;
}
