import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import AppNotice from '../AppNotice'
import { theme } from '../../../theme'

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('AppNotice', () => {
  it('renders the info tone as an alert with its message', () => {
    renderWithTheme(<AppNotice tone="info">AI suggestion · check before deciding</AppNotice>)

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('AI suggestion · check before deciding')
  })

  it('renders the warning tone as an alert with its message', () => {
    renderWithTheme(
      <AppNotice tone="warning">Verify the clarification deadline in the source notice</AppNotice>,
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Verify the clarification deadline in the source notice')
  })
})
