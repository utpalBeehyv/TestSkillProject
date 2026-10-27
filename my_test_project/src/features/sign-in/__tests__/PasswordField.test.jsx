import { render, screen, fireEvent } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ThemeProvider } from '@mui/material/styles'
import PasswordField from '../components/PasswordField'
import { theme } from '../../../theme'

const schema = z.object({
  password: z.string().min(1, 'Password is required'),
})

function TestForm() {
  const { control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: '' },
  })

  return (
    <ThemeProvider theme={theme}>
      <PasswordField name="password" control={control} label="Password" />
    </ThemeProvider>
  )
}

describe('PasswordField', () => {
  it('renders the password field with a label', () => {
    render(<TestForm />)

    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('renders the input as type password by default', () => {
    render(<TestForm />)

    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('has a show/hide toggle button', () => {
    render(<TestForm />)

    const button = screen.getByLabelText('Show password')
    expect(button).toBeInTheDocument()
  })

  it('toggles the input type from password to text when show button is clicked', () => {
    render(<TestForm />)

    const input = screen.getByLabelText('Password')
    const button = screen.getByLabelText('Show password')

    expect(input).toHaveAttribute('type', 'password')

    fireEvent.click(button)

    expect(input).toHaveAttribute('type', 'text')
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument()
  })

  it('toggles back to password type when hide button is clicked', () => {
    render(<TestForm />)

    const input = screen.getByLabelText('Password')
    const showButton = screen.getByLabelText('Show password')

    fireEvent.click(showButton)
    expect(input).toHaveAttribute('type', 'text')

    const hideButton = screen.getByLabelText('Hide password')
    fireEvent.click(hideButton)

    expect(input).toHaveAttribute('type', 'password')
    expect(screen.getByLabelText('Show password')).toBeInTheDocument()
  })

  it('updates the button aria-pressed state when toggling', () => {
    render(<TestForm />)

    const button = screen.getByLabelText('Show password')
    expect(button).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-pressed', 'false')
  })
})
