import { CELL_TYPE, ROW_ARRAY_TYPE } from '../constants';
// Runtime type checking

export const isRegex = (val: RegExp) => {
  return !!val && Object.prototype.toString.call(val) === `[object RegExp]`;
};

export const isString = (val: CELL_TYPE | ROW_ARRAY_TYPE) => {
  return !!val && typeof val === 'string';
};

export const isNumber = (val: number) => {
  return !!val && typeof val === 'number';
};

export const isFunction = (val: () => any) => {
  return !!val && typeof val === 'function';
};

export const isArray = (val: CELL_TYPE | ROW_ARRAY_TYPE | ROW_ARRAY_TYPE[]) => {
  return !!val && Array.isArray(val);
};

export const isObject = (val: {}) => {
  return !!val && val.toString() === '[object Object]';
};

export const isBoolean = (val: boolean) => {
  return typeof val == 'boolean';
};
