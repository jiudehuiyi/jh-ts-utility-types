import {DeepReadonly} from '../object-operators';
import {SetComplement} from '../union-operators';

// $Keys: 获取集合中的所有key值
// $Keys<{username: string, age: number, job: boolean}>;// username | age | job
type $Keys<T extends object> = keyof T;

// $Values: 获取集合中的所有value值
// $Values<{username: string, age: number, job: boolean}>;// string | number | boolean
type $Values<T extends object> = T[keyof T];

//$ReadOnly<Props> //Readonly<{ name: string; age: number; visible: boolean; }>
export type $ReadOnly<T extends object> = DeepReadonly<T>;

// $Diff<{ name: string; age: number; visible: boolean }, { age: number }>// { name: string; visible: boolean; }

export type $Diff<T extends U, U extends object> = Pick<
  T,
  SetComplement<keyof T, keyof U>
>;

// $PropertyType: 
// type Props = { name: string; age: number; visible: boolean };
// type NameType = $PropertyType<Props, 'name'>;string
// type Tuple = [boolean, number];
// type A = $PropertyType<Tuple, '0'>; boolean
// type B = $PropertyType<Tuple, '1'>;number
export type $PropertyType<T extends object, K extends keyof T> = T[K];

// type Props = { name: string; age: number; visible: boolean };
// type NameType = $ElementType<Props, 'name'>; // string
// type Tuple = [boolean, number];
// type A = $ElementType<Tuple, 0>; // boolean
// type B = $ElementType<Tuple, 1>; // number
// type Arr = boolean[];
// type ItemsType = $ElementType<Arr, number>;//boolean
// type Obj = { [key: string]: number };
// type ValuesType = $ElementType<Obj, string>; //number
export type $ElementType<
  T extends { [P in K & any]: any },
  K extends keyof T | number
> = T[K];

export type $Shape<T extends object> = Partial<T>;

// 构造函数
export type Class<T> = new (...args: any[]) => T;