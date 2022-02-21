import {Primitive, Nullish, Undefined} from '../aliases-typeGuards';

// SetIntersection: 获取两个联合类型中相同的子集，返回一个相同子集相同的联合类型，
// @example:
// SetIntersection<"1" | "2" | "3", "4" | "jh", "2" | "3" | "jh"> // "2" | "3" | "jh"
// SetIntersection<number | string, string> // string
export type SetIntersection<T, U> = T extends U ? T : never;

// SetDifference: 与SetIntersection相反，返回A联合类型中B联合类型不存在的
// @example:
// SetDifference<"1" | "2" | "3", "4" | "jh", "2" | "3" | "jh"> // "1" | "4"
// SetDifference<number | string, string> // number
export type SetDifference<T, U> = T extends U ? never : T;

// SetComplement: B集合是A集合的子集，返回两个子集差集
// @example: 
// SetComplement<"1" | "2" | "3", "1" | "2" > // "3";
// SetComplement<"w" | "j" | "jh", "jh">; // "w" | "j";
export type SetComplement<T, U extends T> = SetDifference<T, U>;

// SymmetricDifference: 两个集合的交集差集
// @example: 
// SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>; // "1" | "4"
export type SymmetricDifference<T, U> = SetDifference<T | U, T & U>;

// NonNullable： 从集合中排除null和undefined
// @example: 
// NonNullable<"jh" | 2 | null | undefined>; // "jh" | "2";
// NonNullable<"jh" | null>;// 'jh'
export type NonNullable<T, U = Nullish> = T extends U ? never : T;
// NonUndefined: 从集合中排除undefined
// @example:
// NonUndefined<"jh" | 2 | undefined>;// "jh" | 2
// NonUndefined<"hg" | 2 | null | undefined>; // "jh" | 2 | null
export type NonUndefined<T> = T extends Undefined ? never : T;

// Exclude: A集合中排除B集合存在的元素  (ts内置,这里也进行实现)
// Exclude<"jh" | "2", "jh"> ;// "2"
export type Exclude<T, U> = T extends U ? never : T;

// Extract: A集合中获取B集合存在的元素,与Exclude相反 (ts内置,这里也进行实现)
export type Extract<T, U> = T extends U ? T : never;
