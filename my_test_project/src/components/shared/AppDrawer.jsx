import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useId } from 'react'

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Shared right-hand drawer shell. Wraps MUI's `Drawer` with the "Right
 * drawer" treatment measured on the Figma file's "UI elements" board
 * (221:2371, "Navigation and drawer" → "Drawer specimen", and its
 * "Owner return drawer" content): 400px wide, white, 2px border, 24px
 * padding, 20px internal gap, an eyebrow + title header, a divider, a
 * scrollable content area, and a stacked action row.
 *
 * MUI's `Drawer` (built on `Modal`) already makes the background inert,
 * traps focus inside while open, returns focus to the trigger on close,
 * and closes on Escape, so this wrapper only supplies the measured
 * layout and an accessible name for the dialog and its close control.
 *
 * @param {{
 *   open: boolean,
 *   onClose: () => void,
 *   eyebrow?: string,
 *   title: string,
 *   actions?: React.ReactNode,
 *   children: React.ReactNode,
 * } & Omit<import('@mui/material/Drawer').DrawerProps, 'anchor' | 'open' | 'onClose'>} props
 */
export default function AppDrawer({ open, onClose, eyebrow, title, actions, children, ...rest }) {
  const titleId = useId()

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      aria-labelledby={titleId}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        },
      }}
      {...rest}
    >
      <Stack component="header" gap={0.5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
          {eyebrow ? (
            <Typography variant="caption" sx={{ color: 'primary.dark' }}>
              {eyebrow}
            </Typography>
          ) : (
            <span />
          )}
          <IconButton aria-label="Close" onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography id={titleId} variant="h2" component="h2">
          {title}
        </Typography>
      </Stack>
      <Divider />
      <Stack gap={2.5} sx={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </Stack>
      {actions && (
        <Stack gap={1} component="footer">
          {actions}
        </Stack>
      )}
    </Drawer>
  )
}
