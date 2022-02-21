// 原始类型集合
export type Primitive = string | number | boolean | symbol | bigint | null | undefined;
// false类型
export type Falsy = null | undefined | 0 | "" | false;

export type Nullish = null | undefined;

export type Undefined = undefined;

export type mixed = unknown;

// 判断是否原始类型(Primitive)
// @example: 
// isPrimitive(2); // true
// isPrimitive({name: 'jiahui'}) //false
export function isPrimitive(value: unknown): value is Primitive {

    if(value === null || value === undefined) {
        return true;
    }
    switch (typeof value) {
        case "string":
        case "number":
        case "boolean":
        case "symbol":
        case "bigint": {
            return true                                
        }
    
        default: {
            return false;
        }
    }
};

// isFalsy 判断是否为false
// @example: 
// isFalsy(false); // true
// isFalsy(0) // true
export const isFalsy = (value: unknown): value is  Falsy => !value;

// isNullish 判断是否为null或者undefined
// @example: 
// isNullish(null) // true
// isNullish(undefined) // true;
export const isNullish = (value: unknown): value is Nullish => value == null;

// isUndefined: 判断是否为undefined
export const isUndefined = (value: unknown): value is Undefined => value === undefined;

