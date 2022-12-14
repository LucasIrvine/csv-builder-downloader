# csv-builder-downloader

![Coverage statements](https://raw.githubusercontent.com/LucasIrvine/csv-builder-downloader/master/coverage/badge-statements.svg)
![Coverage functions](https://raw.githubusercontent.com/LucasIrvine/csv-builder-downloader/master/coverage/badge-functions.svg)
![Coverage lines](https://raw.githubusercontent.com/LucasIrvine/csv-builder-downloader/master/coverage/badge-lines.svg)

## A dependancy free JavaScript tool for composing and downloading csv files. Written in TypeScript.

<br />

### Simple Usage

This is will sanitize the values and download a file: `csv-download-<timestamp>.csv`

```javascript
const yourData = [[...headers][...row1][...row2]];

new CsvBuilder().addRows(yourData).download();
```

<br />

### Advanced Usage

Pass in configuration and make usage match your data model more closely.

```javascript
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

## CsvBuilder

### Configuration

| Option           | Default                       | Type    |
| ---------------- | ----------------------------- | ------- |
| encodingType     | `data:text/csv;charset=utf-8` | String  |
| file             | `''`                          | String  |
| fileSuffix       | `.csv`                        | String  |
| filename         | `csv-download`                | String  |
| includeTimeStamp | `true`                        | Boolean |
| nonValueIndices  | `[]`                          | Array   |
| sanitizeRegex    | `/[^a-zA-Z0-9:\./_\-@$ ]/g`   | RegExp  |
| sanitizeValues   | `true`                        | Boolean |

### Methods

```javascript
.addCell(val: CELL_TYPE, sanitize: boolean = true)
```

```javascript
.addRow(val: CELL_TYPE | ROW_ARRAY_TYPE, sanitize?: boolean)
```

```javascript
.addRows(rows: ROW_ARRAY_TYPE[])
```

```javascript
.addNewLine(count: number = 1)
```

```javascript
.addSection({ title, headers, rows, newLines }: SECTION_TYPE)
```

```javascript
.getEncodedFile()
```

```javascript
.getFilename()
```

```javascript
.changeRegex(passedRegex: RegExp)
```

```javascript
.download()
```

<br />

## CsvDownloader

If using the CsvBuilder, you do not need to separately use the CsvDownloader, but it can be used on its own if needed.

### Configuration (all required if using separately)

| Option      | Type   |
| ----------- | ------ |
| encodedFile | String |
| filename    | String |

### Methods

```javascript
.getBlob()
```

```javascript
.getBlobUrl(csvData: Blob)
```

```javascript
.download()
```
