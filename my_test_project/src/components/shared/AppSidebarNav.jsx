import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'

/**
 * Shared sidebar shell. Wraps a navy navigation panel measured on the
 * Figma file's "UI elements" board (221:2371, "Navigation and drawer" →
 * "Sidebar specimen") and cross-checked against the Home screen's own
 * layout (84:340: a 254px "Aside" beside a flexible content "Container"
 * at the 1440px frame) — navy #102947, 16px padding, 16px gap, 40px tall
 * items, selected item filled #254F80 with a 2px #4776AD border, resting
 * items in a lighter navy-tinted label color.
 *
 * Items navigate with React Router's `NavLink` (already a project
 * dependency), so the selected state is driven by the current route
 * rather than a prop the caller has to keep in sync.
 *
 * Responsive: the Figma file only measures the 1440px desktop frame.
 * Below `md` the panel drops its fixed 254px width and becomes a
 * full-width block so it stays usable on mobile and tablet; this layout
 * choice is this component's own, not a measured Figma spec — see the
 * design-foundations report.
 *
 * @param {{
 *   brand: string,
 *   items: Array<{ key: string, label: string, to: string, end?: boolean, icon?: React.ReactNode }>,
 * } & import('@mui/material/Box').BoxProps} props
 */
export default function AppSidebarNav({ brand, items, sx, ...rest }) {
  return (
    <Box
      component="nav"
      aria-label={brand}
      sx={{
        width: { xs: '100%', md: 254 },
        flexShrink: 0,
        bgcolor: 'navy.main',
        color: 'navy.contrastText',
        borderRadius: 1,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        ...sx,
      }}
      {...rest}
    >
      <Typography variant="subtitle2" component="p" sx={{ color: 'navy.contrastText', m: 0 }}>
        {brand}
      </Typography>
      <Box
        component="ul"
        sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}
      >
        {items.map((item) => (
          <Box component="li" key={item.key}>
            <Box
              component={NavLink}
              to={item.to}
              end={item.end}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                height: 40,
                px: 1,
                borderRadius: 1,
                border: '2px solid transparent',
                textDecoration: 'none',
                color: 'navy.mutedText',
                '&.active': {
                  bgcolor: 'navy.selected',
                  borderColor: 'navy.selectedBorder',
                  color: 'navy.contrastText',
                },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'common.white',
                  outlineOffset: 2,
                },
              }}
            >
              {item.icon && (
                <Box
                  component="span"
                  aria-hidden="true"
                  sx={{ display: 'flex', width: 20, height: 20, flexShrink: 0 }}
                >
                  {item.icon}
                </Box>
              )}
              <Typography variant="subtitle2" component="span" sx={{ color: 'inherit' }}>
                {item.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
