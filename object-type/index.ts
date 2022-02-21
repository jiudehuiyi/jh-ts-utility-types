import {IterationMap} from './iteration';
import {Extends, ComputeRaw, Keys} from '../any'

export type IterationOf<N extends number> =  `${N}` extends keyof IterationMap
? IterationMap[`${N}`]
: IterationMap['__'];

export type __Pick<T extends object, U extends keyof T > = {
    [P in U]: T[P]
} & {};

export type _Pick<T extends object, U extends keyof any> = __Pick< T, keyof T & U >;

export type Pick<T extends object, U extends keyof any> = T extends unknown ? Pick<T, U> : never;

export type Exclude<T extends any, U extends any> = T extends U ? never : T;

export type _Omit<T extends object, U extends keyof any> = _Pick<T, Exclude<keyof T, U> >;

export type Omit<T extends object, U extends keyof any> = T extends unknown ? _Pick<T, U> : never;

export type Depth = 'flat' | 'deep'

// 对象单层转化为必须
export type RequiredFlat<T> = {
    [P in keyof T]-?: T[P];
} & {}
// 对象单层转化为可选
export type OptionalFlat<T> = {
    [P in keyof T]?: T[P];
} & {};
export type RequiredIfKeys<O extends object, K extends keyof any> =
    Extends<keyof O & K, K> extends 1
    ? RequiredFlat<O>
    : O;

export type __AtLeast<O extends object, K extends keyof any> =
    K extends keyof O               
    ? _Pick<O, K> & OptionalFlat<O> 
    : O   
export type _AtLeast<O extends object, K extends keyof any> =
    ComputeRaw<__AtLeast<RequiredIfKeys<O, K>, K>>     

export type AtLeast<O extends object, K extends keyof any = Keys<O>> =
    O extends unknown
    ? _AtLeast<O, K>
    : never


