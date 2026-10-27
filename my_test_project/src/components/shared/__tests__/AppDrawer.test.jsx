import { ThemeProvider } from '@mui/material/styles'
import { fireEvent, render, screen } from '@testing-library/react'
import AppDrawer from '../AppDrawer'
import { theme } from '../../../theme'

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('AppDrawer', () => {
  it('is not in the document while closed', () => {
    renderWithTheme(
      <AppDrawer open={false} onClose={vi.fn()} title="Solution and architecture">
        Content
      </AppDrawer>,
    )

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
  })

  it('shows the title and content while open', () => {
    renderWithTheme(
      <AppDrawer open onClose={vi.fn()} eyebrow="Work item" title="Solution and architecture">
        <p>Accountable owner: Architect / Technical owner</p>
      </AppDrawer>,
    )

    expect(screen.getByRole('heading', { name: 'Solution and architecture' })).toBeInTheDocument()
    expect(screen.getByText('Accountable owner: Architect / Technical owner')).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn()
    renderWithTheme(
      <AppDrawer open onClose={onClose} title="Solution and architecture">
        Content
      </AppDrawer>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose on Escape', () => {
    const onClose = vi.fn()
    renderWithTheme(
      <AppDrawer open onClose={onClose} title="Solution and architecture">
        Content
      </AppDrawer>,
    )

    fireEvent.keyDown(screen.getByRole('heading', { name: 'Solution and architecture' }), {
      key: 'Escape',
      code: 'Escape',
    })

    expect(onClose).toHaveBeenCalled()
  })
})
