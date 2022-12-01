import {
  COMMA,
  CSV_ENCODING_TYPE,
  EMPTY_STRING,
  DEFAULT_FILENAME,
  DEFAULT_SUFFIX,
  DEFAULT_REGEX,
  REMOVE_COMMA_REGEX,
} from '.';

// These are excluded from the ts build
export const CSV_BUILDER_CONFIG_SIMPLE = {
  filename: 'test-file-simple',
};
export const CHARS = `abcXYZ123,,..!!@@##$$%%^^&&**(())__++--==~~[[]]\\{{}}||;;''::""//<<>>??¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ“‘«åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷`;
export const DEFAULT_ALLOWED_CHARS = 'abcXYZ123..@@$$__--:://';
export const STRING_INPUT_1 = 'Is this your homework larry?';
export const STRING_INPUT_2 = 'Can you not';
export const ENCODED_STRING_INPUT = encodeURI(STRING_INPUT_2);
export const NUMERIC_INPUT = 1000000.713;
export const COMMA_INPUT = 'Well, well, well...';
export const NO_COMMA_INPUT = 'Well well well...';
export const FORMATTED_NUMERIC_INPUT = '$1,000,000.713';
export const DATE_1 = '01/04/85';
export const DATE_2 = '12-05-1983';
export const TEST_ROW = [STRING_INPUT_1, NUMERIC_INPUT, STRING_INPUT_2, FORMATTED_NUMERIC_INPUT, DATE_1, DATE_2, CHARS];
export const TEST_ROWS_ARRAY = [TEST_ROW, TEST_ROW, TEST_ROW];
export const ENCODED_FILE = `${CSV_ENCODING_TYPE}${ENCODED_STRING_INPUT}${COMMA}`;
export const MOCK_FILENAME = 'MyCsvDownload';
export const MOCK_FUNCTION = () => MOCK_FILENAME;
export const MOCK_BOOLEAN = true;
export const MOCK_OBJECT = { test: 'object' };
export const ALL_OPTIONS_DEFAULT = {
  encodingType: CSV_ENCODING_TYPE,
  file: EMPTY_STRING,
  fileSuffix: DEFAULT_SUFFIX,
  filename: DEFAULT_FILENAME,
  includeTimeStamp: true,
  nonValueIndices: [],
  sanitizeRegex: DEFAULT_REGEX,
  sanitizeValues: true,
};
export const ALL_OPTIONS_CUSTOM = {
  encodingType: 'data:text/csv;charset=utf-16',
  file: 'Already, Have, Header, Data,',
  fileSuffix: '.xlxs',
  filename: 'Not_A_Very_Good_Name',
  includeTimeStamp: false,
  nonValueIndices: [0, 1],
  sanitizeRegex: REMOVE_COMMA_REGEX,
  sanitizeValues: false,
};
