import { API_BASE_URL } from "../../constants";

export function apiRequest(url: string, options?: {}, params?: {}) {
  const searchParams = params ? new URLSearchParams(params) : "";
  try {
    return fetch(API_BASE_URL + url + searchParams, options).then(
      (response) => response.json()
    );
  } catch (e) {
    console.log(e)
  }

  return undefined;
}
