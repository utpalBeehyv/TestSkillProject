import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

/**
 * Shared surface card. Wraps MUI's `Card` with the treatment measured on
 * the Figma file's "UI elements" board (221:2371, "Shared card" —
 * "Capability fit" / "Strong fit"): white, radius 10px, 2px border, card
 * shadow, 20px padding, 16px internal gap. Radius/border/shadow are set
 * globally on `MuiCard` in `src/theme/theme.js`.
 *
 * `title` and `action` compose the heading row the file pairs with a
 * `StatusPill` (e.g. "Capability fit" + "Strong fit"); both are
 * optional so the card also works as a plain surface.
 *
 * @param {{
 *   title?: string,
 *   action?: React.ReactNode,
 *   children: React.ReactNode,
 * } & import('@mui/material/Card').CardProps} props
 */
export default function AppCard({ title, action, children, sx, ...rest }) {
  return (
    <Card sx={{ p: 2.5, ...sx }} {...rest}>
      <CardContent
        sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2, '&:last-child': { pb: 0 } }}
      >
        {(title || action) && (
          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
            {title && (
              <Typography variant="h3" component="h3">
                {title}
              </Typography>
            )}
            {action}
          </Stack>
        )}
        {children}
      </CardContent>
    </Card>
  )
}
