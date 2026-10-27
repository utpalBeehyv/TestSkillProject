import { configureStore } from '@reduxjs/toolkit'
import { api } from './apiSlice'

/**
 * The one Redux store for the app. Server data lives in the RTK Query
 * `api` slice (src/state/apiSlice.js); a feature adds its own client
 * state slice here only when that state is not server data and not
 * local to a single component (per best-practices' state table).
 */
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export default store
