import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import AppStepper from '../AppStepper'
import { theme } from '../../../theme'

const steps = [
  { key: 'clarify', label: 'Clarify' },
  { key: 'plan', label: 'Plan' },
  { key: 'track', label: 'Track' },
]

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('AppStepper', () => {
  it('marks the active step as the current step', () => {
    renderWithTheme(<AppStepper steps={steps} activeIndex={1} />)

    const activeStep = screen.getByText('Plan').closest('li')
    expect(activeStep).toHaveAttribute('aria-current', 'step')
  })

  it('does not mark completed or upcoming steps as current', () => {
    renderWithTheme(<AppStepper steps={steps} activeIndex={1} />)

    expect(screen.getByText('Clarify').closest('li')).not.toHaveAttribute('aria-current')
    expect(screen.getByText('Track').closest('li')).not.toHaveAttribute('aria-current')
  })

  it('renders every step label', () => {
    renderWithTheme(<AppStepper steps={steps} activeIndex={0} />)

    expect(screen.getByText('Clarify')).toBeInTheDocument()
    expect(screen.getByText('Plan')).toBeInTheDocument()
    expect(screen.getByText('Track')).toBeInTheDocument()
  })
})
