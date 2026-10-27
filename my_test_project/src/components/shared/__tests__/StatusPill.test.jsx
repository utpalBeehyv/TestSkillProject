import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import StatusPill from '../StatusPill'
import { theme } from '../../../theme'

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('StatusPill', () => {
  it.each([
    ['info', 'Needs decision'],
    ['pending', 'Needs review'],
    ['success', 'Passed'],
    ['warning', 'Verify deadline'],
    ['error', 'Blocked'],
  ])('renders the %s tone with its label', (tone, label) => {
    renderWithTheme(<StatusPill tone={tone} label={label} />)

    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('defaults to the info tone when none is given', () => {
    renderWithTheme(<StatusPill label="Needs decision" />)

    expect(screen.getByText('Needs decision')).toBeInTheDocument()
  })
})
