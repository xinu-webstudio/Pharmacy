/**
 * Builds a URL query string from an object of parameters,
 * filtering out any undefined, null, or empty string values.
 *
 * @param params - Object containing key-value pairs for query parameters
 * @returns A formatted query string with '?' prefix or an empty string
 */
export const buildQueryParams = (
  params: Record<string, string | number | boolean | undefined | null | any>
): Record<string, string | number | boolean> => {
  const filteredParams: Record<string, string | number | boolean> = {};

  // Only add parameters that have values
  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      value !== 'all'
    ) {
      filteredParams[key] = value;
    }
  });

  return filteredParams;
};
