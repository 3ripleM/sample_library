const symbol: unique symbol = Symbol();
export interface Branded<key extends string> {
  [symbol]: { [k in key]: true };
}

export type Brand<a, key extends string> = a & Branded<key>;
