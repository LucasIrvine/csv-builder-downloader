import { Test } from './index';

describe('Main entry file index.ts', () => {
  it('Should successfully test', () => {
    expect(Test('Me')).toBe('Test Me');
  });
});
