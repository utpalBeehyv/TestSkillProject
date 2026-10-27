/**
 * The one shared HTTP client for the app. Domain services (and the RTK
 * Query base query in src/state/apiSlice.js) call through here instead
 * of calling `fetch` directly, per api-integration. Base URL comes from
 * the frontend env (`VITE_API_BASE_URL`); no secrets live here.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export class HttpError extends Error {
  /**
   * @param {string} message
   * @param {{ status?: number, data?: unknown }} [details]
   */
  constructor(message, { status, data } = {}) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.data = data
  }
}

/**
 * @param {string} path
 * @param {RequestInit & { json?: unknown }} [options]
 * @returns {Promise<unknown>}
 */
export async function request(path, { json, headers, ...options } = {}) {
  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body: json !== undefined ? JSON.stringify(json) : options.body,
    })
  } catch (networkError) {
    // Shared error handler: a request that never reached the server
    // (offline, DNS, CORS) still surfaces as an HttpError the caller
    // can branch on.
    throw new HttpError(`Network error calling ${path}`, {
      status: undefined,
      data: networkError,
    })
  }

  const contentType = response.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text()

  if (!response.ok) {
    throw new HttpError(`Request to ${path} failed with ${response.status}`, {
      status: response.status,
      data,
    })
  }

  return data
}

export const httpClient = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, json, options) => request(path, { ...options, method: 'POST', json }),
  put: (path, json, options) => request(path, { ...options, method: 'PUT', json }),
  patch: (path, json, options) => request(path, { ...options, method: 'PATCH', json }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}

export default httpClient
