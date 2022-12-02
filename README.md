# csv-builder-downloader

![Coverage statements](coverage/badge-statements.svg)
![Coverage functions](coverage/badge-functions.svg)
![Coverage lines](coverage/badge-lines.svg)

## A dependancy free JavaScript tool for composing and downloading csv files. Written in TypeScript.

<br />

### Compose a csv file with easy to understand chainable syntax that matches the structure of your data model.

<br />

### Simple Usage - Create and Download a .csv File

This is will sanitize the values and download a file: csv-download-<timestamp>.csv

```
//
const yourData = [[...headers][...row1][...row2]];

new CsvBuilder().addRows(yourData).download();
```

#### Advanced Usage - Pass in configuration and make usage match your data model more closely.

```
const {
    defaultFileHeading,
    yesterdayFileHeaders,
    yesterdayData,
    todayFileHeaders,
    todayData,
    getFileName,
} from yourReducerOrDataModel;

// Initialize with custom parameters (all optional)
const csvBuilder = new CsvBuilder({
    filename: getFileName(), // Generate a filemane
    includeTimeStamp: false, // By default adds a timestamp to the end
    sanitizeRegex: /[^a-zA-Z0-9:\./_\-@$ ]/g, // Regex override
    nonValueIndices: [0,5] // These values wont be sanitized
});

// Add a row or multiple rows
csvBuilder
    .addRow(`${defaultFileHeading} Yesterday:`)
    .addRow(yesterdayFileHeaders)
    .addRows(yesterdayData)
    .addNewLine(2);

// Add cell at a time
yesterdayData.forEach((metric) => csvBuilder.addCell(someCalculation(metric)));

// Use a helper function for a typical table
csvBuilder.addSection({
    title: `${defaultFileHeading} Today:`,
    headers: todayFileHeaders,
    rows: todayData
});

// Change the sanitize RegEx mid file creation
csvBuilder.changeRegEx(/[^a-zA-Z:\./_\-@$ ]/g);

// Add cell at a time
todayData.forEach((metric) => csvBuilder.addCell(someCalculation(metric)));

// Finally download
csvBuilder.download();

```

## CsVBuilder

### Configuration

| Option           | Default                       | Type    |
| ---------------- | ----------------------------- | ------- |
| encodingType     | `data:text/csv;charset=utf-8` | String  |
| file             | ''                            | String  |
| fileSuffix       | `.csv`                        | String  |
| filename         | `csv-download`                | String  |
| includeTimeStamp | `true`                        | Boolean |
| nonValueIndices  | `[]`                          | Array   |
| sanitizeRegex    | `/[^a-zA-Z0-9:\./_\-@$ ]/g`   | RegExp  |
| sanitizeValues   | true,                         | Boolean |

### Methods

#### `.addCell(val: CELL_TYPE, sanitize: boolean = true)`

<br />

#### `.addRow(val: CELL_TYPE | ROW_ARRAY_TYPE, sanitize?: boolean)`

<br />

#### `.addRows(rows: ROW_ARRAY_TYPE[])`

<br />

#### `.addNewLine(count: number = 1)`

<br />

#### `.addSection({ title, headers, rows, newLines }: SECTION_TYPE)`

<br />

#### `.getEncodedFile()`

<br />

#### `.getFilename()`

<br />

#### `.download()`

<br />
