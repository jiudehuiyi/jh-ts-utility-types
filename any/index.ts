
export type Key = keyof any;

export type List<T = any> = ReadonlyArray<T>;

export type Depth = 'flat' | 'deep';

export type BuiltIn = Function | Error | Date | RegExp | Generator | { readonly [Symbol.toStringTag]: string };

export type Has<U extends any, T extends any> = [U] extends [T] ? 1 : 0;

export type Boolean = 0 | 1;

export type If<B extends Boolean, Then, Else = never> = B extends 1 ? Then : Else;


// 获取promise的泛型类型
// Await<Promise<string>> // string
export type Await<T extends Promise<any>> = T extends Promise<infer P> ? P : T;

// type User = {
//       info: {
//           name: string
//           age: number
//           payment: {}
//       }
//       id: number
//      }
// At<User, 'id'> // number
export type At<A extends any, K extends Key> =
    A extends List
    ? number extends A['length']
      ? K extends number | `${number}`
        ? A[never] | undefined
        : undefined
      : K extends keyof A ? A[K] : undefined
    : unknown extends A ? unknown :
      K extends keyof A ? A[K] :
      undefined;

// Case: 如果T被U约束，则返回T，否则返回U
// Case<'jh', string> // 'jh'
export type Case<T extends any, U extends any> = T extends U ? T : U;

export type ComputeRaw<T extends any> = T extends Function ? T : {[ P in keyof T ]: T[P] };

// 单层
export type ComputeFlat<A extends any> =
    A extends BuiltIn ? A :
    A extends Array<any>
    ? A extends Array<Record<Key, any>>
      ? Array<{[K in keyof A[number]]: A[number][K]} & unknown>
      : A
    : A extends ReadonlyArray<any>
      ? A extends ReadonlyArray<Record<Key, any>>
        ? ReadonlyArray<{[K in keyof A[number]]: A[number][K]} & unknown>
        : A
      : {[K in keyof A]: A[K]} & unknown;
// 多层
export type ComputeDeep<A extends any, Seen = never> =
A extends BuiltIn ? A : If<Has<Seen, A>, A, (
  A extends Array<any>
  ? A extends Array<Record<Key, any>>
    ? Array<{[K in keyof A[number]]: ComputeDeep<A[number][K], A | Seen>} & unknown>
    : A
  : A extends ReadonlyArray<any>
    ? A extends ReadonlyArray<Record<Key, any>>
      ? ReadonlyArray<{[K in keyof A[number]]: ComputeDeep<A[number][K], A | Seen>} & unknown>
      : A
    : {[K in keyof A]: ComputeDeep<A[K], A | Seen>} & unknown
)>;

// Compute<{x: 'x'} & {y: 'y'}> // {x: 'x', y: 'y'}
export type Compute<A extends any, depth extends Depth = 'deep'> = {
    'flat': ComputeFlat<A>,
    'deep': ComputeDeep<A>,
}[depth];

// Extends: T是否是U的一部分
// Extends<"a", "a" | "b">;// true
// Extends<{a: any}, {a: any, b: any}>// false
export type Extends<T extends any, U extends any> = [T] extends [never] ? 0 : T extends U ? 1 : 0;

// Equals: T和U类型是否相等
// Equals<42 | 0, 42 | 0> // true
// Equals<{a: string}, {b: string}> // false
export type Equals<T extends any, U extends any> = ( <A>() => A extends T ? 1 : 0  ) extends ( <A>() => A extends U ? 1 : 0 ) ? 1 : 0;

export type Keys<A extends any> =
    A extends List
    ? Exclude<keyof A, keyof any[]> | number
    : keyof A

export type KnownKeys<O extends object> = {
    [K in keyof O]:
    string extends K ? never :
    number extends K ? never :
    K
} extends {
    [K in keyof O]: infer U
} ? U & Keys<O> : never;

// Promise: 创建一个Promise
// Promise<number>// Promise<number>
// Promise<Promise<number>> // Promise<number>
export type Promise<T extends any > = globalThis.Promise< T extends globalThis.Promise<infer A> ? A : T >;

// Try: 判断T是否约束U，是就返回T，否则返回Catch
// Try<'42', string> // '42'
// Try<'42', number> // never
export type Try<T extends any, U extends any, Catch = never> = T extends U ? T : Catch;
