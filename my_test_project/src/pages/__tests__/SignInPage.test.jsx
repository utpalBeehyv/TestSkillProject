import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import SignInPage from '../SignInPage'
import { theme } from '../../theme'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </BrowserRouter>,
  )
}

describe('SignInPage', () => {
  it('renders the page with main element', () => {
    renderWithProviders(<SignInPage />)

    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders the illustration panel with carousel slides', () => {
    renderWithProviders(<SignInPage />)

    expect(screen.getByText('From opportunity to outcome.')).toBeInTheDocument()
    expect(screen.getByText('RFP found')).toBeInTheDocument()
  })

  it('renders the sign-in form', () => {
    renderWithProviders(<SignInPage />)

    expect(screen.getByText('Welcome back')).toBeInTheDocument()
    expect(screen.getByText('Sign in to your RFP workspace')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign in/ })).toBeInTheDocument()
  })

  it('renders both the email and password fields', () => {
    renderWithProviders(<SignInPage />)

    expect(screen.getByLabelText(/Email address/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument()
  })

  it('renders the password field with show/hide toggle', () => {
    renderWithProviders(<SignInPage />)

    expect(screen.getByLabelText('Show password')).toBeInTheDocument()
  })

  it('renders the play/pause button for the carousel', () => {
    renderWithProviders(<SignInPage />)

    expect(screen.getByLabelText(/illustration carousel/)).toBeInTheDocument()
  })
})
