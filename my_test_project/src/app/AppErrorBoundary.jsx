import { Component } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

/**
 * Shared error boundary. Used once at the app root and once per route
 * (see src/app/router.jsx) so a crash in one route does not blank the
 * whole app. Every use gets a fallback message and a retry button.
 */
export default class AppErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('AppErrorBoundary caught an error', error, info)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
    this.props.onRetry?.()
  }

  render() {
    const { hasError, error } = this.state
    const { children, label } = this.props

    if (!hasError) {
      return children
    }

    return (
      <Box role="alert" sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" component="p" gutterBottom>
          {label ?? 'Something went wrong.'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {error?.message ?? 'An unexpected error occurred.'}
        </Typography>
        <Button variant="contained" onClick={this.handleRetry}>
          Try again
        </Button>
      </Box>
    )
  }
}
