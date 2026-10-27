import { ThemeProvider } from '@mui/material/styles'
import { fireEvent, render, screen } from '@testing-library/react'
import AppButton from '../AppButton'
import { theme } from '../../../theme'

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('AppButton', () => {
  it('renders the primary variant as a real button and fires onClick', () => {
    const onClick = vi.fn()
    renderWithTheme(
      <AppButton onClick={onClick}>Confirm owner return</AppButton>,
    )

    const button = screen.getByRole('button', { name: 'Confirm owner return' })
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders the secondary variant with its label', () => {
    renderWithTheme(<AppButton variant="secondary">Send reminder</AppButton>)

    expect(screen.getByRole('button', { name: 'Send reminder' })).toBeInTheDocument()
  })

  it('renders the text variant with its label', () => {
    renderWithTheme(<AppButton variant="text">Ask owner</AppButton>)

    expect(screen.getByRole('button', { name: 'Ask owner' })).toBeInTheDocument()
  })

  it('does not fire onClick while disabled', () => {
    const onClick = vi.fn()
    renderWithTheme(
      <AppButton disabled onClick={onClick}>
        Approve input
      </AppButton>,
    )

    const button = screen.getByRole('button', { name: 'Approve input' })
    expect(button).toBeDisabled()

    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
