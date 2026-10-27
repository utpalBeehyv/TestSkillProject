import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import AppErrorBoundary from './AppErrorBoundary'

// Route-level lazy loading: each page is its own chunk.
const HomePage = lazy(() => import('../pages/HomePage'))
const SignInPage = lazy(() => import('../pages/SignInPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

function RouteLoadingFallback() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
      <CircularProgress aria-label="Loading page" />
    </Box>
  )
}

/**
 * Per-route error boundary. `retryKey` is bumped on retry so the
 * boundary and its lazy-loaded child both remount, which re-triggers
 * the dynamic import (a plain boundary reset would not retry a failed
 * chunk load).
 */
function RouteBoundary({ children, label }) {
  const [retryKey, setRetryKey] = useState(0)

  return (
    <AppErrorBoundary
      key={retryKey}
      label={label}
      onRetry={() => setRetryKey((count) => count + 1)}
    >
      {children}
    </AppErrorBoundary>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route
          path="/"
          element={
            <RouteBoundary label="The home page hit a problem.">
              <HomePage />
            </RouteBoundary>
          }
        />
        <Route
          path="/sign-in"
          element={
            <RouteBoundary label="The sign-in page hit a problem.">
              <SignInPage />
            </RouteBoundary>
          }
        />
        <Route
          path="*"
          element={
            <RouteBoundary label="This page hit a problem.">
              <NotFoundPage />
            </RouteBoundary>
          }
        />
      </Routes>
    </Suspense>
  )
}
