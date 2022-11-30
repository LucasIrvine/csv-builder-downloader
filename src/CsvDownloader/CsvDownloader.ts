export default class CsvDownloader {
  encodedFile: string;
  filename: string;

  constructor(encodedFile: string, filename: string) {
    this.encodedFile = encodedFile;
    this.filename = filename;
  }

  getBlob() {
    return new Blob([this.encodedFile]);
  }

  getBlobUrl(csvData: Blob) {
    if (window.URL?.createObjectURL) {
      return window.URL.createObjectURL(csvData);
    }

    return window.webkitURL.createObjectURL(csvData);
  }

  download() {
    const downloadLink = document.createElement('a');

    downloadLink.href = this.encodedFile;
    downloadLink.target = '_blank';
    downloadLink.download = this.filename;
    downloadLink.click();
  }

  downloadBlob() {
    const filename = this.filename;
    const csvBlob = this.getBlob();

    // Proprietary to IE window.navigator
    const nav = window.navigator as any;

    if (nav.msSaveBlob) {
      nav.msSaveBlob(csvBlob, filename);

      return;
    }

    // Non-IE
    const downloadUrl = this.getBlobUrl(csvBlob);
    const tempLink = document.createElement('a');

    tempLink.style.display = 'none';
    tempLink.href = downloadUrl;
    tempLink.setAttribute('download', filename);

    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }
}
