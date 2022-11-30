import { COMMA, CSV_ENCODING_TYPE } from '../constants';

// These are excluded from the ts build
export const CHARS = `abcXYZ123,,..!!@@##$$%%^^&&**(())__++--==~~[[]]\\{{}}||;;''::""//<<>>??¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ“‘«åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷`;
export const DEFAULT_ALLOWED_CHARS = 'abcXYZ123..@@$$__--:://';
export const STRING_INPUT_1 = 'Is this your homework larry?';
export const STRING_INPUT_2 = 'Can you not';
export const ENCODED_STRING_INPUT = encodeURI(STRING_INPUT_2);
export const NUMERIC_INPUT = 1000000.713;
export const FORMATTED_NUMERIC_INPUT = '$1,000,000.713';
export const DATE_1 = '01/04/85';
export const DATE_2 = '12-05-1983';
export const TEST_ROW = [STRING_INPUT_1, NUMERIC_INPUT, STRING_INPUT_2, FORMATTED_NUMERIC_INPUT, DATE_1, DATE_2, CHARS];
export const TEST_ROWS_ARRAY = [TEST_ROW, TEST_ROW, TEST_ROW];
export const ENCODED_FILE = `${CSV_ENCODING_TYPE}${ENCODED_STRING_INPUT}${COMMA}`;
export const MOCK_FILENAME = 'MyCsvDownload';
