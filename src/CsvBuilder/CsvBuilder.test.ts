import CsvBuilder from './index';

import { COMMA, CSV_BUILDER_CONFIG_SIMPLE, CSV_ENCODING_TYPE, EMPTY_STRING, NEW_LINE } from '../constants';

import {
  CHARS,
  DEFAULT_ALLOWED_CHARS,
  STRING_INPUT_1,
  STRING_INPUT_2,
  ENCODED_STRING_INPUT,
  TEST_ROW,
  TEST_ROWS_ARRAY,
} from '../constants/testingMocks';

describe('CsvBuilder', () => {
  let csvBuilder: CsvBuilder;

  beforeEach(() => {
    csvBuilder = new CsvBuilder(CSV_BUILDER_CONFIG_SIMPLE);
  });

  describe('constructor', () => {
    it('should set the config values correctly.', () => {
      expect(csvBuilder.filename).toEqual(CSV_BUILDER_CONFIG_SIMPLE.filename);
    });
  });

  describe('removeCommas (static)', () => {
    it('should remove all commas from a value', () => {
      const input = '1,000,000,000';
      const expectedOutput = '1000000000';
      expect(CsvBuilder.removeCommas(input)).toEqual(expectedOutput);
    });
  });

  describe('.sanitize', () => {
    it('should allow only characters in the default regex (alphanumeric, dates)', () => {
      expect(csvBuilder.sanitize(CHARS)).toEqual(DEFAULT_ALLOWED_CHARS);
      expect(csvBuilder.sanitize(CHARS)).toMatchSnapshot();
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
    it('', () => {});
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
