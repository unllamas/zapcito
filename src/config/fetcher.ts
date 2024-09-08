/**
 * Custom fetcher function for SWR to handle streaming responses
 * @param url The URL to fetch data from
 * @returns Parsed JSON data from the response
 * @throws Error if the fetch fails or the response is not OK
 */
export default async function fetcher(url: string): Promise<any> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();

    if (!reader) {
      throw new Error('Response body is not readable');
    }

    let result = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      result += new TextDecoder().decode(value);
    }

    return JSON.parse(result);
  } catch (error) {
    console.error('Fetcher error:', error);
    throw error; // Re-throw the error for SWR to handle
  }
}
