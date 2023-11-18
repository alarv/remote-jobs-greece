import { formatNumber } from '../number.util';

describe('number util', () => {
  test.each([
    [300000, '300.000'],
    [30000, '30.000'],
    [3000, '3.000'],
    ['300000', '300.000'],
    ['30000', '30.000'],
    ['3000', '3.000'],
  ])(
    'if given %s it formats it as %s',
    (givenNumber: number | string, expectedNumber: string) => {
      expect(formatNumber(givenNumber)).toBe(expectedNumber);
    },
  );
});
