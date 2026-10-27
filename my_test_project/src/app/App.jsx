import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppErrorBoundary from './AppErrorBoundary'
import AppRoutes from './router'
import { store } from '../state/store'
import { theme } from '../theme'

/**
 * App root: Redux store, MUI theme, the app-root error boundary, and
 * the router. No feature UI lives here — pages compose it instead
 * (src/pages/).
 */
export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppErrorBoundary label="The app hit a problem.">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppErrorBoundary>
      </ThemeProvider>
    </ReduxProvider>
  )
}
