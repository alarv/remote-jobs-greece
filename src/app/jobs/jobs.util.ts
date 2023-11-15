import { IFilters } from '@/app/components/Filters';

const FILTER_PREFIX = 'filter_';

type FilterKeys = keyof IFilters;
type WhiteListedFilterKeys = {
  [key in FilterKeys]: boolean;
};

const FILTER_WHITELISTED_KEYS: WhiteListedFilterKeys = {
  company_name: true,
  job_type: true,
  job_field: true,
};

export function prefixFilterKeysWithFilters(filters: object): object {
  const updatedEntries = Object.entries(filters).map(([key, value]) => {
    if (FILTER_WHITELISTED_KEYS[key as FilterKeys]) {
      return [`${FILTER_PREFIX}${key}`, value];
    } else {
      return [key, value];
    }
  });

  return Object.fromEntries(updatedEntries);
}
