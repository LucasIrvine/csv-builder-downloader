import CsvDownloader from '../CsvDownloader';
import {
  COMMA,
  CSV_ENCODING_TYPE,
  DEFAULT_FILENAME,
  DEFAULT_REGEX,
  DEFAULT_SUFFIX,
  EMPTY_STRING,
  NEW_LINE,
  REMOVE_COMMA_REGEX,
  ROW_ARRAY_TYPE,
  CELL_TYPE,
  SECTION_TYPE,
  CSV_BUILDER_CONFIG_TYPE,
  EMPTY_ARRAY,
} from '../constants';

import { isString, isArray, isNumber, isBoolean } from '../utils';

export default class CsvBuilder {
  encodingType: string;
  file: string;
  fileSuffix: string;
  filename: string;
  includeTimeStamp: boolean;
  nonValueIndices: number[];
  sanitizeRegex: RegExp;
  sanitizeValues: boolean;

  constructor({
    encodingType = CSV_ENCODING_TYPE,
    file = EMPTY_STRING,
    fileSuffix = DEFAULT_SUFFIX,
    filename = DEFAULT_FILENAME,
    includeTimeStamp = true,
    nonValueIndices = EMPTY_ARRAY,
    sanitizeRegex = DEFAULT_REGEX,
    sanitizeValues = true,
  }: CSV_BUILDER_CONFIG_TYPE) {
    this.encodingType = encodingType;
    this.file = file;
    this.fileSuffix = fileSuffix;
    this.filename = filename;
    this.includeTimeStamp = includeTimeStamp;
    this.nonValueIndices = nonValueIndices || [];
    this.sanitizeRegex = sanitizeRegex || DEFAULT_REGEX;
    this.sanitizeValues = sanitizeValues;
  }

  static removeCommas(val: string) {
    return val?.toString().replace(REMOVE_COMMA_REGEX, EMPTY_STRING) || EMPTY_STRING;
  }

  changeRegex(passedRegex: RegExp) {
    this.sanitizeRegex = passedRegex;

    return this;
  }

  sanitize(val: CELL_TYPE, commaOnly?: boolean) {
    if (commaOnly) {
      return CsvBuilder.removeCommas(val.toString());
    }

    return val.toString().replace(this.sanitizeRegex, EMPTY_STRING);
  }

  appendToFile(val: CELL_TYPE, newLine?: boolean) {
    this.file += val;
    if (newLine) {
      this.addNewLine();
    }
  }

  addCell(val: CELL_TYPE, sanitize: boolean = this.sanitizeValues) {
    const value = `${sanitize ? this.sanitize(val) : val}${COMMA}`;

    this.appendToFile(value);

    return this;
  }

  addRow(val: CELL_TYPE | ROW_ARRAY_TYPE, sanitize?: boolean) {
    if (isString(val)) {
      this.appendToFile(val as string, true);
    }

    if (isArray(val)) {
      this.addRowArray(val as ROW_ARRAY_TYPE, sanitize);
    }

    return this;
  }

  addRows(rows: ROW_ARRAY_TYPE[]) {
    if (isArray(rows)) {
      rows.forEach((row) => this.addRow(row));
    }

    return this;
  }

  addRowArray(rowArray: ROW_ARRAY_TYPE, sanitize?: boolean) {
    if (!isArray(rowArray)) {
      return;
    }

    if (this.sanitizeValues && !sanitize) {
      rowArray = rowArray.map((cell: CELL_TYPE, i: number) => {
        return this.nonValueIndices.indexOf(i) > -1 ? this.sanitize(cell, true) : this.sanitize(cell);
      });
    }

    this.appendToFile(rowArray.join(COMMA), true);
  }

  addNewLine(count: number = 1) {
    if (count < 1 || !isNumber(count)) {
      return this;
    }

    while (count-- as number) {
      this.appendToFile(NEW_LINE);
    }

    return this;
  }

  addSection({ title, headers, rows, newLines }: SECTION_TYPE) {
    if (isString(title)) {
      this.addRow(title);
    }

    if (isArray(headers)) {
      this.addRow(headers, true);
    }

    if (isArray(rows) && isArray(rows[0])) {
      this.addRows(rows);
    }

    this.addNewLine(newLines);

    return this;
  }

  getEncodedFile() {
    return `${this.encodingType}${encodeURI(this.file)}`;
  }

  getFilename() {
    if (this.includeTimeStamp) {
      return `${this.filename}-${new Date().valueOf()}${this.fileSuffix}`;
    }

    return `${this.filename}${this.fileSuffix}`;
  }

  download() {
    new CsvDownloader(this.getEncodedFile(), this.getFilename()).download();

    return this;
  }
}
