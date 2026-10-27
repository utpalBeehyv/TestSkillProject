import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

/**
 * Shared data table. Wraps MUI's `Table` parts with the "Work table"
 * treatment measured on the Figma file's "UI elements" board (221:2371,
 * "Surface specimens" → "Work table specimen"): white surface, radius
 * 10px, 2px border, a tinted header row (`supportingSurface`, 12px
 * caption cells), and 2px dividers between 16px-padded, 80px-min-height
 * body rows.
 *
 * Declarative `columns`/`rows` API (rather than exposing raw
 * `TableHead`/`TableRow`/`TableCell` to callers) so every page gets the
 * same semantic `<table>` structure and styling instead of re-building
 * it per screen.
 *
 * @param {{
 *   caption?: string,
 *   columns: Array<{ key: string, label: string, width?: number | string }>,
 *   rows: Array<{ id: string | number, cells: Record<string, React.ReactNode> }>,
 * } & import('@mui/material/TableContainer').TableContainerProps} props
 */
export default function AppTable({ caption, columns, rows, sx, ...rest }) {
  return (
    <TableContainer
      sx={{
        border: '2px solid',
        borderColor: 'divider',
        borderRadius: '10px',
        bgcolor: 'background.paper',
        ...sx,
      }}
      {...rest}
    >
      <Table sx={{ minWidth: 480 }}>
        {caption && <caption style={{ captionSide: 'top', textAlign: 'left' }}>{caption}</caption>}
        <TableHead>
          <TableRow sx={{ bgcolor: 'supportingSurface' }}>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                sx={{
                  borderBottom: 'none',
                  color: 'text.primary',
                  fontSize: 12,
                  lineHeight: '18px',
                  width: column.width,
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sx={{
                    borderTop: rowIndex === 0 ? 'none' : '2px solid',
                    borderBottom: 'none',
                    borderColor: 'divider',
                    height: 80,
                  }}
                >
                  {row.cells[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
