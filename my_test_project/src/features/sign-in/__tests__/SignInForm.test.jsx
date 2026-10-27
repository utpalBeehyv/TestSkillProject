import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import SignInForm from '../components/SignInForm'
import { theme } from '../../../theme'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </BrowserRouter>,
  )
}

describe('SignInForm', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders the form with email and password fields', () => {
    renderWithProviders(<SignInForm />)

    expect(screen.getByLabelText(/Email address/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument()
  })

  it('renders the submit button enabled, even before the form is filled in', () => {
    renderWithProviders(<SignInForm />)

    const button = screen.getByRole('button', { name: /Sign in/ })
    expect(button).toBeEnabled()
  })

  it('shows field errors and does not navigate when submitted empty', async () => {
    renderWithProviders(<SignInForm />)

    const button = screen.getByRole('button', { name: /Sign in/ })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Enter your email address.')).toBeInTheDocument()
    })
    expect(screen.getByText('Enter your password.')).toBeInTheDocument()
    expect(button).toBeEnabled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('moves focus to the email field when submitted with an invalid email', async () => {
    renderWithProviders(<SignInForm />)

    const emailInput = screen.getByLabelText(/Email address/)
    const passwordInput = screen.getByLabelText(/Password/)
    const button = screen.getByRole('button', { name: /Sign in/ })

    fireEvent.change(emailInput, { target: { value: 'not-an-email' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    })
    expect(emailInput).toHaveFocus()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('clears the email error live as the user corrects it after a failed submit', async () => {
    renderWithProviders(<SignInForm />)

    const emailInput = screen.getByLabelText(/Email address/)
    const button = screen.getByRole('button', { name: /Sign in/ })

    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByText('Enter your email address.')).toBeInTheDocument()
    })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    await waitFor(() => {
      expect(screen.queryByText('Enter your email address.')).not.toBeInTheDocument()
    })
  })

  it('navigates to home when form is submitted with valid data', async () => {
    renderWithProviders(<SignInForm />)

    const emailInput = screen.getByLabelText(/Email address/)
    const passwordInput = screen.getByLabelText(/Password/)
    const button = screen.getByRole('button', { name: /Sign in/ })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('renders the prototype-only note', () => {
    renderWithProviders(<SignInForm />)

    expect(
      screen.getByText(
        /Prototype only. Use a made-up password; accounts are not verified./,
      ),
    ).toBeInTheDocument()
  })

  it('renders the welcome back heading', () => {
    renderWithProviders(<SignInForm />)

    expect(screen.getByText('Welcome back')).toBeInTheDocument()
    expect(screen.getByText('Sign in to your RFP workspace')).toBeInTheDocument()
  })
})
