import CsvBuilder from './index';

import { COMMA, CSV_ENCODING_TYPE, EMPTY_STRING, NEW_LINE } from '../constants';

import {
  CSV_BUILDER_CONFIG_SIMPLE,
  CHARS,
  DEFAULT_ALLOWED_CHARS,
  STRING_INPUT_1,
  STRING_INPUT_2,
  ENCODED_STRING_INPUT,
  TEST_ROW,
  TEST_ROWS_ARRAY,
  COMMA_INPUT,
  NO_COMMA_INPUT,
  ALL_OPTIONS_DEFAULT,
  ALL_OPTIONS_CUSTOM,
} from '../constants/testing';

describe('CsvBuilder', () => {
  let csvBuilder: CsvBuilder;

  beforeEach(() => {
    csvBuilder = new CsvBuilder(CSV_BUILDER_CONFIG_SIMPLE);
  });

  describe('constructor', () => {
    it('should use all the default values if nothing passed to constructor', () => {
      csvBuilder = new CsvBuilder({});

      const {
        encodingType,
        file,
        fileSuffix,
        filename,
        includeTimeStamp,
        nonValueIndices,
        sanitizeRegex,
        sanitizeValues,
      } = csvBuilder;

      expect(encodingType).toEqual(ALL_OPTIONS_DEFAULT.encodingType);
      expect(file).toEqual(ALL_OPTIONS_DEFAULT.file);
      expect(fileSuffix).toEqual(ALL_OPTIONS_DEFAULT.fileSuffix);
      expect(filename).toEqual(ALL_OPTIONS_DEFAULT.filename);
      expect(includeTimeStamp).toEqual(ALL_OPTIONS_DEFAULT.includeTimeStamp);
      expect(nonValueIndices).toEqual(ALL_OPTIONS_DEFAULT.nonValueIndices);
      expect(sanitizeRegex).toEqual(ALL_OPTIONS_DEFAULT.sanitizeRegex);
      expect(sanitizeValues).toEqual(ALL_OPTIONS_DEFAULT.sanitizeValues);
    });

    it('should use all the custom values passed to constructor', () => {
      csvBuilder = new CsvBuilder(ALL_OPTIONS_CUSTOM);

      const {
        encodingType,
        file,
        fileSuffix,
        filename,
        includeTimeStamp,
        nonValueIndices,
        sanitizeRegex,
        sanitizeValues,
      } = csvBuilder;

      expect(encodingType).toEqual(ALL_OPTIONS_CUSTOM.encodingType);
      expect(file).toEqual(ALL_OPTIONS_CUSTOM.file);
      expect(fileSuffix).toEqual(ALL_OPTIONS_CUSTOM.fileSuffix);
      expect(filename).toEqual(ALL_OPTIONS_CUSTOM.filename);
      expect(includeTimeStamp).toEqual(ALL_OPTIONS_CUSTOM.includeTimeStamp);
      expect(nonValueIndices).toEqual(ALL_OPTIONS_CUSTOM.nonValueIndices);
      expect(sanitizeRegex).toEqual(ALL_OPTIONS_CUSTOM.sanitizeRegex);
      expect(sanitizeValues).toEqual(ALL_OPTIONS_CUSTOM.sanitizeValues);
    });
  });

  describe('removeCommas (static)', () => {
    it('should remove all commas from a value', () => {
      const input = '1,000,000,000';
      const expectedOutput = '1000000000';
      expect(CsvBuilder.removeCommas(input)).toEqual(expectedOutput);
    });

    it('should return default EMPTY_STRING if no val passed in', () => {
      const input = null;
      const expectedOutput = EMPTY_STRING;
      // @ts-ignore: passing in the wrong type
      expect(CsvBuilder.removeCommas(input)).toEqual(expectedOutput);
    });
  });

  describe('.sanitize', () => {
    it('should allow only characters in the default regex (alphanumeric, dates)', () => {
      expect(csvBuilder.sanitize(CHARS)).toEqual(DEFAULT_ALLOWED_CHARS);
      expect(csvBuilder.sanitize(CHARS)).toMatchSnapshot();
    });

    it('should allow only remove commas if commaOnly set to truthy', () => {
      expect(csvBuilder.sanitize(COMMA_INPUT, true)).toEqual(NO_COMMA_INPUT);
    });
  });

  describe('.appendToFile', () => {
    it('should append to current file string', () => {
      const expectedOutput1 = `${STRING_INPUT_1}`;
      const expectedOutput2 = `${STRING_INPUT_1}${STRING_INPUT_2}`;

      csvBuilder.appendToFile(STRING_INPUT_1);
      expect(csvBuilder.file).toEqual(expectedOutput1);

      csvBuilder.appendToFile(STRING_INPUT_2);
      expect(csvBuilder.file).toEqual(expectedOutput2);

      expect(csvBuilder.file).toMatchSnapshot();
    });
  });

  describe('.addCell', () => {
    it('should produce the same file, given the same input', () => {
      csvBuilder.addCell(STRING_INPUT_1);

      expect(csvBuilder.file).toMatchSnapshot();
    });

    it('should call sanitize if sanitize arg is truthy', () => {
      csvBuilder.sanitize = jest.fn();
      csvBuilder.addCell(STRING_INPUT_1);

      expect(csvBuilder.sanitize).toHaveBeenCalledTimes(1);
    });

    it('should not call sanitize if sanitize arg is falsy', () => {
      csvBuilder.sanitize = jest.fn();
      csvBuilder.addCell(STRING_INPUT_1, false);

      expect(csvBuilder.sanitize).toHaveBeenCalledTimes(0);
    });
  });

  describe('.addRow', () => {
    it('should produce the same file, given the same `string` input', () => {
      csvBuilder.addRow(STRING_INPUT_1);

      expect(csvBuilder.file).toMatchSnapshot();
    });

    it('should produce the same file, given the same `array` input', () => {
      csvBuilder.addRow(TEST_ROW);

      expect(csvBuilder.file).toMatchSnapshot();
    });

    it('should only return the class instance if neither a `string` or `array` is passed', () => {
      // @ts-ignore: passing in the wrong type
      expect(csvBuilder.addRow(true)).toBe(csvBuilder);
      expect(csvBuilder.file).toEqual(EMPTY_STRING);
    });
  });

  describe('.addRows', () => {
    it('should produce the same file, given the same input', () => {
      csvBuilder.addRows(TEST_ROWS_ARRAY);

      expect(csvBuilder.file).toMatchSnapshot();
    });

    it('should call .addRow for each item in the array', () => {
      const arrayLength = TEST_ROWS_ARRAY.length;

      csvBuilder.addRow = jest.fn();
      csvBuilder.addRows(TEST_ROWS_ARRAY);

      expect(csvBuilder.addRow).toHaveBeenCalledTimes(arrayLength);
    });

    it('should only return the class instance if anything but an `array` is passed', () => {
      // @ts-ignore: passing in the wrong type
      expect(csvBuilder.addRows(true)).toBe(csvBuilder);
      expect(csvBuilder.file).toEqual(EMPTY_STRING);
    });
  });

  describe('.addRowArray', () => {
    it('should produce the same file, given the same input', () => {
      csvBuilder.addRowArray(TEST_ROW);

      expect(csvBuilder.file).toMatchSnapshot();
    });

    it('should return early and not add to the file if a non-array value is passed', () => {
      // @ts-ignore: passing in the wrong type
      csvBuilder.addRowArray(STRING_INPUT_1);

      expect(csvBuilder.file).toEqual(EMPTY_STRING);
    });

    it('should not sanitize non-value indices (comma only)', () => {
      csvBuilder = new CsvBuilder({ nonValueIndices: [0, 2] });
      csvBuilder.sanitize = jest.fn();
      csvBuilder.addRowArray(['first', 'second', 'third', 'fourth']);

      expect(csvBuilder.sanitize).toHaveBeenNthCalledWith(1, 'first', true);
      expect(csvBuilder.sanitize).toHaveBeenNthCalledWith(2, 'second');
      expect(csvBuilder.sanitize).toHaveBeenNthCalledWith(3, 'third', true);
      expect(csvBuilder.sanitize).toHaveBeenNthCalledWith(4, 'fourth');
    });
  });

  describe('.addNewLine', () => {
    it('should not add a new line with a falsy value passed', () => {
      // @ts-ignore: passing in the wrong type
      csvBuilder.addNewLine(null);

      expect(csvBuilder.file).toEqual(EMPTY_STRING);
    });

    it('should not add a new line with a non-numerical value passed', () => {
      // @ts-ignore: passing in the wrong type
      csvBuilder.addNewLine(STRING_INPUT_2);

      expect(csvBuilder.file).toEqual(EMPTY_STRING);
    });

    it('should default to one new line when no count value passed', () => {
      csvBuilder.addNewLine();

      expect(csvBuilder.file).toEqual(NEW_LINE);
    });
  });

  describe('.getEncodedFile', () => {
    it('should produce the same file, given the same input', () => {
      csvBuilder.addCell(STRING_INPUT_1);
      expect(csvBuilder.getEncodedFile()).toMatchSnapshot();
    });

    it("should create the encoded file from the CsvBuilder's default encoding type (CSV_ENCODING_TYPE) and the current file uri encoded", () => {
      const expectedOutput = `${CSV_ENCODING_TYPE}${ENCODED_STRING_INPUT}${COMMA}`;

      csvBuilder.addCell(STRING_INPUT_2);
      expect(csvBuilder.getEncodedFile()).toEqual(expectedOutput);
    });
  });

  // TODO
  describe('.addSection', () => {
    it('should call the correct class methods if all the correct values are passed in', () => {
      csvBuilder.addRow = jest.fn();
      csvBuilder.addRows = jest.fn();
      csvBuilder.addNewLine = jest.fn();

      csvBuilder.addSection({
        title: STRING_INPUT_1,
        headers: TEST_ROW,
        rows: TEST_ROWS_ARRAY,
        newLines: 2,
      });

      expect(csvBuilder.addRow).toHaveBeenCalledTimes(2);
      expect(csvBuilder.addRows).toHaveBeenCalledTimes(1);
      expect(csvBuilder.addNewLine).toHaveBeenCalledTimes(1);
    });

    it('should only call addNewLine if no other proper types are passed', () => {
      csvBuilder.addRow = jest.fn();
      csvBuilder.addRows = jest.fn();
      csvBuilder.addNewLine = jest.fn();
      csvBuilder.addSection({
        // @ts-ignore: passing in the wrong type
        title: TEST_ROW,
        // @ts-ignore: passing in the wrong type
        headers: STRING_INPUT_1,
        // @ts-ignore: passing in the wrong type
        rows: STRING_INPUT_2,
        newLines: 2,
      });

      expect(csvBuilder.addRow).toHaveBeenCalledTimes(0);
      expect(csvBuilder.addRows).toHaveBeenCalledTimes(0);
      expect(csvBuilder.addNewLine).toHaveBeenCalledTimes(1);
    });
  });

  describe('.getFilename', () => {
    it('should use the passed in filename and include a 13 char timestamp and delimeter if not turned off', () => {
      expect(csvBuilder.getFilename().length).toEqual(34);
    });

    it('should use the passed in filename and not include a timestamp instantiated with falsy value', () => {
      csvBuilder = new CsvBuilder({ ...CSV_BUILDER_CONFIG_SIMPLE, includeTimeStamp: false });

      expect(csvBuilder.getFilename().length).toEqual(20);
    });
  });

  describe('.download', () => {
    it('should call the getEncodedFile and getFilename functions', () => {
      global.URL.createObjectURL = jest.fn();
      csvBuilder.getEncodedFile = jest.fn();
      csvBuilder.getFilename = jest.fn();

      csvBuilder.download();

      expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
      expect(csvBuilder.getEncodedFile).toHaveBeenCalledTimes(1);
      expect(csvBuilder.getFilename).toHaveBeenCalledTimes(1);
    });
  });
});
