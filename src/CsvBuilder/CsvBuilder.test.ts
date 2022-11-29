import CsvBuilder from './index';

import { COMMA, CSV_BUILDER_CONFIG_SIMPLE, CSV_ENCODING_TYPE, EMPTY_STRING, NEW_LINE } from '../constants';

// Keep in file so it doesnt get packaged in prod build with other constants
const CHARS = `abcXYZ123,,..!!@@##$$%%^^&&**(())__++--==~~[[]]\\{{}}||;;''::""//<<>>??¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ“‘«åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷`;
const DEFAULT_ALLOWED_CHARS = 'abcXYZ123..@@$$__--:://';
const STRING_INPUT_1 = 'Is this your homework larry?';
const STRING_INPUT_2 = 'Can you not';
const ENCODED_STRING_INPUT = encodeURI(STRING_INPUT_2);
const NUMERIC_INPUT = 1000000.713;
const FORMATTED_NUMERIC_INPUT = '$1,000,000.713';
const DATE_1 = '01/04/85';
const DATE_2 = '12-05-1983';
const TEST_ROW = [STRING_INPUT_1, NUMERIC_INPUT, STRING_INPUT_2, FORMATTED_NUMERIC_INPUT, DATE_1, DATE_2, CHARS];
const TEST_ROWS_ARRAY = [TEST_ROW, TEST_ROW, TEST_ROW];

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
});
