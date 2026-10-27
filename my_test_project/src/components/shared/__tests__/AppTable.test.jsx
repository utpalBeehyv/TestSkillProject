import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import AppTable from '../AppTable'
import { theme } from '../../../theme'

const columns = [
  { key: 'item', label: 'Work item', width: 200 },
  { key: 'owner', label: 'Owner', width: 168 },
  { key: 'due', label: 'Due', width: 100 },
  { key: 'status', label: 'Return status' },
]

const rows = [
  {
    id: 'solution',
    cells: {
      item: 'Solution and architecture',
      owner: 'Architect / Technical owner',
      due: 'Before submission',
      status: 'Return confirmed',
    },
  },
  {
    id: 'pricing',
    cells: {
      item: 'Pricing and financial template',
      owner: 'Finance / Commercial owner',
      due: 'Before submission',
      status: 'In progress',
    },
  },
]

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('AppTable', () => {
  it('renders a real table with a header row for every column', () => {
    renderWithTheme(<AppTable columns={columns} rows={rows} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Work item' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Owner' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Return status' })).toBeInTheDocument()
  })

  it('renders every row with its cell content', () => {
    renderWithTheme(<AppTable columns={columns} rows={rows} />)

    expect(screen.getAllByRole('row')).toHaveLength(rows.length + 1)
    expect(screen.getByText('Solution and architecture')).toBeInTheDocument()
    expect(screen.getByText('Return confirmed')).toBeInTheDocument()
    expect(screen.getByText('In progress')).toBeInTheDocument()
  })
})
