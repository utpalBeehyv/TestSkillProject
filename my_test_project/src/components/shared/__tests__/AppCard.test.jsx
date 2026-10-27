import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import AppCard from '../AppCard'
import StatusPill from '../StatusPill'
import { theme } from '../../../theme'

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('AppCard', () => {
  it('renders the title, an action slot, and its children', () => {
    renderWithTheme(
      <AppCard title="Capability fit" action={<StatusPill tone="success" label="Strong fit" />}>
        <p>Discovery, content mapping and migration planning align with prior work.</p>
      </AppCard>,
    )

    expect(screen.getByRole('heading', { name: 'Capability fit', level: 3 })).toBeInTheDocument()
    expect(screen.getByText('Strong fit')).toBeInTheDocument()
    expect(
      screen.getByText('Discovery, content mapping and migration planning align with prior work.'),
    ).toBeInTheDocument()
  })

  it('renders without a title or action', () => {
    renderWithTheme(
      <AppCard>
        <p>Plain surface</p>
      </AppCard>,
    )

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.getByText('Plain surface')).toBeInTheDocument()
  })
})
