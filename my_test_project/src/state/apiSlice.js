import { createApi } from '@reduxjs/toolkit/query/react'
import { httpClient, HttpError } from '../services/httpClient'

/**
 * Adapts the one shared HTTP client (src/services/httpClient.js) to
 * RTK Query's `baseQuery` contract. Every RTK Query endpoint still
 * goes through that client — and its shared error handler — instead of
 * a second fetch instance, per api-integration's "one client for the
 * app" rule.
 *
 * @returns {import('@reduxjs/toolkit/query').BaseQueryFn}
 */
function httpClientBaseQuery() {
  return async ({ url, method = 'GET', body, params }) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : ''
    const path = `${url}${query}`

    try {
      const data = ['GET', 'DELETE'].includes(method)
        ? await httpClient[method.toLowerCase()](path)
        : await httpClient[method.toLowerCase()](path, body)
      return { data }
    } catch (error) {
      if (error instanceof HttpError) {
        return { error: { status: error.status, data: error.data ?? error.message } }
      }
      return { error: { status: 'FETCH_ERROR', data: error.message } }
    }
  }
}

/**
 * TODO(contract): no Swagger/OpenAPI URL yet (see
 * src/services/apiStub.js), so no endpoints are injected here. A
 * feature slice calls `api.injectEndpoints({ endpoints: (build) =>
 * ({...}) })` once a real contract exists. Do not add endpoints for
 * guessed paths.
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: httpClientBaseQuery(),
  endpoints: () => ({}),
})

export default api
