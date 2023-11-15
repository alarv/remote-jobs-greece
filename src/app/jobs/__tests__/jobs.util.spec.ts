import { prefixFilterKeysWithFilters } from '../jobs.util';

describe('jobs util', () => {
  test('if empty returns empty object', () => {
    expect(prefixFilterKeysWithFilters({})).toStrictEqual({});
  });

  test('if it contains filters, prefix them', () => {
    expect(
      prefixFilterKeysWithFilters({
        job_field: 'software',
      }),
    ).toStrictEqual({
      filters_job_field: 'software',
    });
  });

  test('if it contains non filter keys, do not prefix them', () => {
    expect(
      prefixFilterKeysWithFilters({
        job_field: 'software',
        page: 2,
      }),
    ).toStrictEqual({
      filters_job_field: 'software',
      page: 2,
    });
  });
});
