import { isArray, isBoolean, isFunction, isNumber, isObject, isRegex, isString } from './index';
import { ALPHA_NUMERIC_DATE_REGEX } from '../constants';
import {
  TEST_ROW as MOCK_ARRAY,
  STRING_INPUT_1 as MOCK_STRING,
  NUMERIC_INPUT as MOCK_NUMBER,
  MOCK_BOOLEAN,
  MOCK_FUNCTION,
  MOCK_OBJECT,
} from '../constants/testingMocks';

describe('utils', () => {
  // TODO
  describe('.isRegex', () => {
    it('should return true if a Regex is passed in', () => {
      expect(isRegex(ALPHA_NUMERIC_DATE_REGEX)).toEqual(true);
    });

    it('should return false if an array is passed in', () => {
      expect(isRegex(MOCK_ARRAY)).toEqual(false);
    });

    it('should return false if a boolean is passed in', () => {
      expect(isRegex(MOCK_BOOLEAN)).toEqual(false);
    });

    it('should return false if an object is passed in', () => {
      expect(isRegex(MOCK_OBJECT)).toEqual(false);
    });

    it('should return false if a string is passed in', () => {
      expect(isRegex(MOCK_STRING)).toEqual(false);
    });

    it('should return false if a function is passed in', () => {
      expect(isRegex(MOCK_FUNCTION)).toEqual(false);
    });

    it('should return false if a number is passed in', () => {
      expect(isRegex(MOCK_NUMBER)).toEqual(false);
    });

    it('should return false if no value is passed in', () => {
      // @ts-ignore: passing in the wrong type
      expect(isRegex()).toEqual(false);
    });
  });

  describe('.isString', () => {
    it('should return true if a string is passed in', () => {
      expect(isString(MOCK_STRING)).toEqual(true);
    });

    it('should return false if an array is passed in', () => {
      expect(isString(MOCK_ARRAY)).toEqual(false);
    });

    it('should return false if a boolean is passed in', () => {
      expect(isString(MOCK_BOOLEAN)).toEqual(false);
    });

    it('should return false if an object is passed in', () => {
      expect(isString(MOCK_OBJECT)).toEqual(false);
    });

    it('should return false if a Regex is passed in', () => {
      expect(isString(ALPHA_NUMERIC_DATE_REGEX)).toEqual(false);
    });

    it('should return false if a function is passed in', () => {
      expect(isString(MOCK_FUNCTION)).toEqual(false);
    });

    it('should return false if a number is passed in', () => {
      expect(isString(MOCK_NUMBER)).toEqual(false);
    });

    it('should return false if no value is passed in', () => {
      // @ts-ignore: passing in the wrong type
      expect(isString()).toEqual(false);
    });
  });

  describe('.isNumber', () => {
    it('should return true if a number is passed in', () => {
      expect(isNumber(MOCK_NUMBER)).toEqual(true);
    });

    it('should return false if a string is passed in', () => {
      expect(isNumber(MOCK_STRING)).toEqual(false);
    });

    it('should return false if an array is passed in', () => {
      expect(isNumber(MOCK_ARRAY)).toEqual(false);
    });

    it('should return false if a boolean is passed in', () => {
      expect(isNumber(MOCK_BOOLEAN)).toEqual(false);
    });

    it('should return false if an object is passed in', () => {
      expect(isNumber(MOCK_OBJECT)).toEqual(false);
    });

    it('should return false if a Regex is passed in', () => {
      expect(isNumber(ALPHA_NUMERIC_DATE_REGEX)).toEqual(false);
    });

    it('should return false if a function is passed in', () => {
      expect(isNumber(MOCK_FUNCTION)).toEqual(false);
    });

    it('should return false if no value is passed in', () => {
      // @ts-ignore: passing in the wrong type
      expect(isNumber()).toEqual(false);
    });
  });

  describe('.isFunction', () => {
    it('should return true if a function is passed in', () => {
      expect(isFunction(MOCK_FUNCTION)).toEqual(true);
    });

    it('should return false if a string is passed in', () => {
      expect(isFunction(MOCK_STRING)).toEqual(false);
    });

    it('should return false if an array is passed in', () => {
      expect(isFunction(MOCK_ARRAY)).toEqual(false);
    });

    it('should return false if a boolean is passed in', () => {
      expect(isFunction(MOCK_BOOLEAN)).toEqual(false);
    });

    it('should return false if an object is passed in', () => {
      expect(isFunction(MOCK_OBJECT)).toEqual(false);
    });

    it('should return false if a Regex is passed in', () => {
      expect(isFunction(ALPHA_NUMERIC_DATE_REGEX)).toEqual(false);
    });

    it('should return false if a number is passed in', () => {
      expect(isFunction(MOCK_NUMBER)).toEqual(false);
    });

    it('should return false if no value is passed in', () => {
      // @ts-ignore: passing in the wrong type
      expect(isFunction()).toEqual(false);
    });
  });

  describe('.isArray', () => {
    it('should return true if a array is passed in', () => {
      expect(isArray(MOCK_ARRAY)).toEqual(true);
    });

    it('should return false if a string is passed in', () => {
      expect(isArray(MOCK_STRING)).toEqual(false);
    });

    it('should return false if a boolean is passed in', () => {
      expect(isArray(MOCK_BOOLEAN)).toEqual(false);
    });

    it('should return false if an object is passed in', () => {
      expect(isArray(MOCK_OBJECT)).toEqual(false);
    });

    it('should return false if a Regex is passed in', () => {
      expect(isArray(ALPHA_NUMERIC_DATE_REGEX)).toEqual(false);
    });

    it('should return false if a function is passed in', () => {
      expect(isArray(MOCK_FUNCTION)).toEqual(false);
    });

    it('should return false if a number is passed in', () => {
      expect(isArray(MOCK_NUMBER)).toEqual(false);
    });

    it('should return false if no value is passed in', () => {
      // @ts-ignore: passing in the wrong type
      expect(isArray()).toEqual(false);
    });
  });

  describe('.isObject', () => {
    it('should return true if a object is passed in', () => {
      expect(isObject(MOCK_OBJECT)).toEqual(true);
    });

    it('should return false if a string is passed in', () => {
      expect(isObject(MOCK_STRING)).toEqual(false);
    });

    it('should return false if a boolean is passed in', () => {
      expect(isObject(MOCK_BOOLEAN)).toEqual(false);
    });

    it('should return false if a Regex is passed in', () => {
      expect(isObject(ALPHA_NUMERIC_DATE_REGEX)).toEqual(false);
    });

    it('should return false if a function is passed in', () => {
      expect(isObject(MOCK_FUNCTION)).toEqual(false);
    });

    it('should return false if an array is passed in', () => {
      expect(isObject(MOCK_ARRAY)).toEqual(false);
    });

    it('should return false if a number is passed in', () => {
      expect(isObject(MOCK_NUMBER)).toEqual(false);
    });

    it('should return false if no value is passed in', () => {
      // @ts-ignore: passing in the wrong type
      expect(isObject()).toEqual(false);
    });
  });

  describe('.isBoolean', () => {
    it('should return true if a boolean is passed in', () => {
      expect(isBoolean(MOCK_BOOLEAN)).toEqual(true);
    });

    it('should return false if a string is passed in', () => {
      expect(isBoolean(MOCK_STRING)).toEqual(false);
    });

    it('should return false if a Regex is passed in', () => {
      expect(isBoolean(ALPHA_NUMERIC_DATE_REGEX)).toEqual(false);
    });

    it('should return false if a function is passed in', () => {
      expect(isBoolean(MOCK_FUNCTION)).toEqual(false);
    });

    it('should return false if an object is passed in', () => {
      expect(isBoolean(MOCK_OBJECT)).toEqual(false);
    });

    it('should return false if an array is passed in', () => {
      expect(isBoolean(MOCK_ARRAY)).toEqual(false);
    });

    it('should return false if a number is passed in', () => {
      expect(isBoolean(MOCK_NUMBER)).toEqual(false);
    });

    it('should return false if no value is passed in', () => {
      // @ts-ignore: passing in the wrong type
      expect(isBoolean()).toEqual(false);
    });
  });
});
