// Types
export type CELL_TYPE = string | number | boolean;
export type ROW_ARRAY_TYPE = (string | number | boolean)[];
export type SECTION_TYPE = { title: string; headers: ROW_ARRAY_TYPE; rows: ROW_ARRAY_TYPE[]; newLines: number };
export type CSV_BUILDER_CONFIG_TYPE = {
  encodingType?: string;
  file?: string;
  fileSuffix?: string;
  filename?: string;
  includeTimeStamp?: boolean;
  nonValueIndices?: number[];
  sanitizeRegex?: RegExp;
  sanitizeValues?: boolean;
};
// Params
export const MAX_NEW_LINES = 20;

// Regex
export const ALPHA_NUMERIC_DATE_REGEX = /[^a-zA-Z0-9:\./_\-@$ ]/g;
export const REMOVE_COMMA_REGEX = /,/g;

// Values
export const NEW_LINE = '\n';
export const COMMA = ',';
export const EMPTY_STRING = '';
export const ZERO = 0;
export const DECIMAL_ZERO = 0.0;
export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};
export const NA = 'N/A';

// Files
export const CSV_ENCODING_TYPE = `data:text/csv;charset=utf-8${COMMA}`;
export const DEFAULT_FILENAME = 'csv-download';
export const DEFAULT_SUFFIX = '.csv';

// Default type values
export const STRING_DEFAULT = EMPTY_STRING;
export const NUMBER_DEFAULT = ZERO;
export const ARRAY_DEFAULT = EMPTY_ARRAY;
export const OBJECT_DEFAULT = EMPTY_OBJECT;
export const NULL_DEFAULT = EMPTY_STRING;
export const DEFAULT_REGEX = ALPHA_NUMERIC_DATE_REGEX;
