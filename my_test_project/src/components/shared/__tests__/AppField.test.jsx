import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import AppField from '../AppField'

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
})

function TestForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  })

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <AppField name="email" control={control} label="Email" />
      <button type="submit">Submit</button>
    </form>
  )
}

describe('AppField', () => {
  it('shows the zod validation message after an invalid submit', async () => {
    render(<TestForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
  })

  it('renders the label so the field has an accessible name', () => {
    render(<TestForm />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('moves focus to the native input when setFocus is called', async () => {
    // Regression test: AppField must pass ref as inputRef to MUI's TextField,
    // not as a plain ref, so react-hook-form's setFocus() reaches the native
    // <input> and not the wrapper FormControl.
    function TestFormWithSetFocus() {
      const { control, setFocus } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { email: '' },
      })

      return (
        <form>
          <AppField name="email" control={control} label="Email" />
          <button type="button" onClick={() => setFocus('email')}>
            Focus Email
          </button>
        </form>
      )
    }

    render(<TestFormWithSetFocus />)

    // Click button to trigger setFocus
    fireEvent.click(screen.getByRole('button', { name: 'Focus Email' }))

    // Assert the native input element has focus
    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    await waitFor(() => {
      expect(emailInput).toHaveFocus()
    })
  })
})
