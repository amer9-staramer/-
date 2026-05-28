/**
 * Robust fetch wrapper that gracefully handles non-JSON responses,
 * catches JSON parsing errors, and logs the full server/raw text response
 * content to the console to assist in development/debugging.
 */
export async function apiFetch<T = any>(url: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, options);
  } catch (networkError: any) {
    console.error(`[apiFetch Network Error] Failed to connect to ${url}:`, networkError);
    throw new Error(`Network connection error: ${networkError.message || String(networkError)}`);
  }

  const textContent = await response.text();

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const parsedJson = JSON.parse(textContent);
      errorMessage = parsedJson.error || parsedJson.message || errorMessage;
    } catch {
      // If parsing fails, use raw textContent or default
      if (textContent.trim()) {
        errorMessage = textContent;
      }
    }
    console.error(
      `[apiFetch HTTP Error] Request to ${url} returned status ${response.status}. Raw response text:`,
      textContent
    );
    throw new Error(errorMessage);
  }

  // Treat empty success responses gracefully
  if (!textContent.trim()) {
    return {} as T;
  }

  try {
    return JSON.parse(textContent) as T;
  } catch (jsonError: any) {
    console.error(
      `[apiFetch JSON Parsing Error] Failed to parse JSON from response of ${url}. Expected valid JSON but received raw response content:`,
      textContent
    );
    throw new Error(
      `Invalid server response format. Expected JSON, received: "${
        textContent.length > 200 ? textContent.slice(0, 200) + '...' : textContent
      }". Error: ${jsonError.message}`
    );
  }
}
