import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppSidebarNav from '../AppSidebarNav'
import { theme } from '../../../theme'

const items = [
  { key: 'opportunities', label: 'Opportunities', to: '/opportunities' },
  { key: 'my-work', label: 'My work', to: '/my-work' },
  { key: 'activity', label: 'Activity & audit', to: '/activity' },
]

function renderWithProviders(initialPath) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialPath]}>
        <AppSidebarNav brand="RFP Workspace" items={items} />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe('AppSidebarNav', () => {
  it('renders a nav landmark with a link for every item', () => {
    renderWithProviders('/my-work')

    const nav = screen.getByRole('navigation', { name: 'RFP Workspace' })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Opportunities' })).toHaveAttribute(
      'href',
      '/opportunities',
    )
    expect(screen.getByRole('link', { name: 'My work' })).toHaveAttribute('href', '/my-work')
  })

  it('marks the item matching the current route as the current page', () => {
    renderWithProviders('/my-work')

    expect(screen.getByRole('link', { name: 'My work' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Opportunities' })).not.toHaveAttribute('aria-current')
  })
})
