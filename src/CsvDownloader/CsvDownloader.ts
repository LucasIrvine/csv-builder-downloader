declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}
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
    // Proprietary to IE window.navigator
    const nav = window.navigator as any;

    if (nav.msSaveBlob) {
      nav.msSaveBlob(this.getBlob(), this.filename);

      return;
    }

    // Non-IE
    const downloadUrl = this.getBlobUrl(this.getBlob());
    const tempLink = document.createElement('a');

    tempLink.style.display = 'none';
    tempLink.href = downloadUrl;
    tempLink.setAttribute('download', this.filename);

    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }
}
