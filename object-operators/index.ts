
import {NonUndefined, SetDifference, SetComplement} from '../union-operators';
import {Primitive} from '../aliases-typeGuards';

// FunctionKeys: 获取集合中值为函数的key值，返回一个集合
// @example: 
// FunctionKeys<{ age: 18, 'jh': () => void, '222': (name: string) => void }>// 'jh' | '222'
// tip: -?将所有属性变成必选
export type FunctionKeys<T extends object> = {
    [P in keyof T]-?: NonUndefined<T[P]> extends Function ? P : never
}[keyof T];


// NonFunctionKeys: 获取集合中值不为函数的key值，返回一个集合、与FunctionKeys相反
export type NonFunctionKeys<T extends object> = {
    [P in keyof T]-?: NonUndefined<T[P]> extends Function ? never : P
}[keyof T];

// IfEquals: 判断X、Y两个泛型是否一致，不一致返回B(默认为never)，否则返回A(默认为X)
// IfEquals<string, string>;// string
// IfEquals<{jh: string}, {jh: string}>;// {jh: string}
// IfEquals<{jh: string}, {jh: age}>;// never
export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

// MutableKeys: 获取集合中非只读属性key值
// MutableKeys<{ jh: 222, readonly 'ah': 'bet' }>; // jh

export type MutableKeys<T extends object> = {
    [P in keyof T]-?: IfEquals<
        {[Q in P]: T[P]},
        { -readonly [Q in P]: T[P] },
        P
    > 
}[keyof T];

// ReadonlyKeys: 获取集合中只读属性key值和MutableKeys相反
// ReadonlyKeys<{ jh: 222, readonly 'ah': 'bet' }>; // ah

export type ReadonlyKeys<T extends object> = {
    [P in keyof T]-?: IfEquals<
        {[Q in P]: T[P]},
        { -readonly [Q in P]: T[P] },
        never,
        P
    > 
}[keyof T];

// RequiredKeys： 获取集合中的必选参数的key
// RequiredKeys<{ jh: string, w: string, j: number, his?: string }>;// 'jh' | 'w' | 'j'
export type RequiredKeys<T extends object> = {
    [P in keyof T]-?: {} extends Pick<T, P> ? never : P;
}[keyof T]

// OptionalKeys: 获取集合中可选参数的key
// OptionalKeys<{ jh: string, w: string, j: number, his?: string }>;// 'his'
export type OptionalKeys<T extends object> = {
    [P in keyof T]-?: {} extends Pick<T, P> ? P : never;
}[keyof T];

// Omit从A集合中排除B联合类型中的属性
// Omit<{jh: string, age: 18}, 'age>;//{jh: string}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

//OmitByValue从A集合排除B联合类型的value
// OmitByValue<{username: string, age: number}, string>; // {username: string}
export type OmitByValue<T, U> = Pick<T,
    {[P in keyof T]-?: T[P] extends U ? never: P }[keyof T]
>;

//OmitByValueExact: 
export type OmitByValueExact<T, ValueType> = Pick<
  T,
  {
    [Key in keyof T]-?: [ValueType] extends [T[Key]]
      ? [T[Key]] extends [ValueType]
        ? never
        : Key
      : Key;
  }[keyof T]
>;


// Optional: 从集合中设置可选，默认为全部集合keyof
// type Props = Optional<{ name: string; age: number; visible: boolean; }> // { name?: string; age?: number; visible?: boolean; }
// type Props = Optional<{ name: string; age: number; visible: boolean; }, 'age' | 'visible'>; // { name: string; age?: number; visible?: boolean; }
export type Optional<T, U extends keyof T = keyof T> = Omit<T, U> & Partial<Pick<T, U>>;

// Pick: 获取集合中指定的key 
//  Pick<{ name: string; age: number; visible: boolean }, 'age'>; // {age: number}
export type Pick<T, U extends keyof T> = {
    [P in U]: T[P]
}
// PickByValue: 获取集合中指定的value
// PickByValue<{ req: number; reqUndef: number | undefined; opt?: string; }, number>;// {req: number}
// PickByValue<{ req: number; reqUndef: number | undefined; opt?: string; }, number | undefined>; // { req: number; reqUndef: number | undefined; }


export type PickByValue<T, U> = Pick<T, 
    { [P in keyof T]-?: T[P] extends U ? P : never }[keyof T]
>;

// PickByValueExact: 获取集合中指定的value
// PickByValueExact<{ req: number; reqUndef: number | undefined; opt?: string; }, number>;// Expect: { req: number }
// PickByValueExact<{ req: number; reqUndef: number | undefined; opt?: string; }, number | undefined>;// Expect: { reqUndef: number | undefined; }
export type PickByValueExact<T, ValueType> = Pick<
  T,
  {
    [Key in keyof T]-?: [ValueType] extends [T[Key]]
      ? [T[Key]] extends [ValueType]
        ? Key
        : never
      : never;
  }[keyof T]
>;
//Intersection: 获取两者交集
// Intersection<{username: string, age: 10}, {username: string, job:string}>;//{username: string}
export type Intersection<T extends object, U extends object> = Pick<T, 
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>
// Diff: 获取两个集合交集的补集
// Diff<{username: string, age: 10}, {username: string, job:string}>;//{age: number, job: string};
export type Diff<T extends object, U extends Object> = Pick<T, 
  SetDifference<keyof T, keyof U>
>;

// Subtract: 从A集合中移除B集合中存在的元素
// Subtract<{username: string, age: number, job:string}, {age: number}>// {username: string, job: string}
export type Subtract<T extends T1, T1 extends object> = Pick<
  T,
  SetComplement<keyof T, keyof T1>
>;

// Overwrite: B属性value覆盖A属性值
// Overwrite<{ name: string; age: number; visible: boolean }, { age: string; other: string }> // { name: string; age: string; visible: boolean; }
export type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;

// Assign: B集合分配到A集合，
// Assign<{ name: string; age: number; visible: boolean }, { age: string; other: string }> // { name: string; age: number; visible: boolean; other: string; }
export type Assign<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T> & Diff<U, T>
> = Pick<I, keyof I>;

// Unionize: 将集合A转化为联合类型
// Unionize<{ name: string; age: number; visible: boolean }>; // { name: string; } | { age: number; } | { visible: boolean; }
export type Unionize<T> = {
    [P in keyof T]: {[Q in P]: T[P]}
}[keyof T];

// PromiseType: 获取promise范型
// PromiseType<Promise<string>>;// string
export type PromiseType<T extends Promise<any>> = T extends Promise<infer P> ? P : never;
// 深层全部元素都是可读
export type DeepReadonly<T> = T extends ((...args: any[]) => any) | Primitive
  ? T
  : T extends _DeepReadonlyArray<infer U>
  ? _DeepReadonlyArray<U>
  : T extends _DeepReadonlyObject<infer V>
  ? _DeepReadonlyObject<V>
  : T;
export interface _DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
export type _DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
  };
// 深层全部属性都必须
  export type DeepRequired<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? _DeepRequiredArray<T[number]>
  : T extends object
  ? _DeepRequiredObject<T>
  : T;

  export interface _DeepRequiredArray<T> extends Array<DeepRequired<NonUndefined<T>>> {}
  export type _DeepRequiredObject<T> = {
    [P in keyof T]-?: DeepRequired<NonUndefined<T[P]>>;
  };

  export type DeepNonNullable<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? _DeepNonNullableArray<T[number]>
  : T extends object
  ? _DeepNonNullableObject<T>
  : T;
export interface _DeepNonNullableArray<T>
  extends Array<DeepNonNullable<NonNullable<T>>> {}
export type _DeepNonNullableObject<T> = {
  [P in keyof T]-?: DeepNonNullable<NonNullable<T[P]>>;
};

export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? _DeepPartialArray<U>
  : T extends object
  ? _DeepPartialObject<T>
  : T | undefined;
export interface _DeepPartialArray<T> extends Array<DeepPartial<T>> {}
export type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> };
