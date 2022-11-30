// Type checking

export const isRegex = (val: any) => {
  return !!val && Object.prototype.toString.call(val) === `[object RegExp]`;
};

export const isString = (val: any) => {
  return !!val && typeof val === 'string';
};

export const isNumber = (val: any) => {
  return !!val && typeof val === 'number';
};

export const isFunction = (val: any) => {
  return !!val && typeof val === 'function';
};

export const isArray = (val: any) => {
  return !!val && Array.isArray(val);
};

export const isObject = (val: any) => {
  return !!val && val.toString() === '[object Object]';
};

export const isBoolean = (val: any) => {
  return !!val && typeof val == 'boolean';
};
