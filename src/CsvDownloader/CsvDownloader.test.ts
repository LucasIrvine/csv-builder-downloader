import CsvDownloader from './CsvDownloader';

import { ENCODED_FILE, MOCK_FILENAME } from '../constants/testing';

describe('CsvDownloader', () => {
  let csvDownloader: CsvDownloader;

  beforeEach(() => {
    csvDownloader = new CsvDownloader(ENCODED_FILE, MOCK_FILENAME);
  });

  describe('.getBlob', () => {
    it('should return an instance of a Blob', () => {
      const csvBlob = csvDownloader.getBlob();

      expect(csvBlob instanceof Blob).toEqual(true);
    });
  });

  describe('.getBlobUrl', () => {
    it('should call window.URL.createObjectURL if supported', () => {
      global.URL.createObjectURL = jest.fn();
      const testBlob = csvDownloader.getBlob();

      csvDownloader.getBlobUrl(testBlob);

      expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
    });

    it('should fallback to webkitURL if window.URL.createObjectURL is not supported', () => {
      // @ts-ignore: passing in the wrong type
      global.URL.createObjectURL = null;

      global.webkitURL.createObjectURL = jest.fn();
      const testBlob = csvDownloader.getBlob();

      csvDownloader.getBlobUrl(testBlob);

      expect(window.webkitURL.createObjectURL).toHaveBeenCalledTimes(1);
    });

    it('should return the same output given the same input', () => {
      const testBlob = csvDownloader.getBlob();

      expect(csvDownloader.getBlobUrl(testBlob)).toMatchSnapshot();
    });
  });

  describe('.download', () => {
    it('should use msSaveBlob to download if IE browser and skip the link building', () => {
      global.navigator.msSaveBlob = jest.fn();
      global.document.createElement = jest.fn();

      csvDownloader.download();

      expect(global.navigator.msSaveBlob).toHaveBeenCalledTimes(1);
      expect(global.document.createElement).toHaveBeenCalledTimes(0);
    });
  });
});
