# csv-builder-downloader

![Coverage statements](coverage/badge-statements.svg)
![Coverage functions](coverage/badge-functions.svg)
![Coverage lines](coverage/badge-lines.svg)

## A dependancy free JavaScript tool for composing and downloading csv files. Written in TypeScript.

<br />

### Compose a csv file with easy to understand chainable syntax that matches the structure of your data model:

```
const {
    defaultFileHeading = '',
    yesterdayFileHeaders = [],
    yesterdayData = [],
    todayFileHeaders = [],
    todayData = [],
} from yourDataModelOrReducer;

return new CsvBuilder() // Pass your config or not for defaults
    .addRow(`${defaultFileHeading} Yesterday:`)
    .addRow(yesterdayFileHeaders)
    .addRows(yesterdayData)
    .addNewLine(2)
    .addSection({
        title: `${defaultFileHeading} Today:`,
        headers: todayFileHeaders,
        rows: todayData,
        newLines: 2
    }); // or organize the same by section
```
