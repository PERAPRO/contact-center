const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
}

interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Builds a query string from the given parameters.
 *
 * @param params - An object containing key-value pairs to be converted into a query string.
 *                 The values can be of any type that can be converted to a string.
 *                 Undefined or null values will be ignored.
 * @returns A query string that can be appended to a URL.
 */
const buildQueryString = (params: QueryParams): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};

/**
 * Fetches data from the API.
 *
 * @template T - The type of the data to be returned.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {QueryParams} [queryParams={}] - The query parameters to include in the request.
 * @param {FetchOptions} [options={}] - Additional fetch options such as headers.
 * @returns {Promise<T>} - A promise that resolves to the fetched data.
 * @throws {Error} - Throws an error if the response is not ok.
 */
export const fetchAPI = async <T>(
  endpoint: string,
  queryParams: QueryParams = {},
  options: FetchOptions = {}
): Promise<T> => {

  const queryString = buildQueryString(queryParams);
  const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) {
      throw new Error(`Error (${response.status}): ${response.statusText}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : ([] as T);
  } catch (error) {
    console.error("Fetch error:", error);
    return [] as T;
  }
};
