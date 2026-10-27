import Alert from '@mui/material/Alert'

/**
 * Shared inline notice banner. Wraps MUI's `Alert` with the two
 * treatments measured on the Figma file's "UI elements" board
 * (221:2371, "Notice styles"): `info` ("AI suggestion · check before
 * deciding", blue) and `warning` ("Verify the clarification deadline…",
 * amber) — 16px padding, radius 8px, 2px border, 20px icon, Inter 14/20
 * Semi Bold message.
 *
 * `severity="info"|"warning"` also drives MUI's built-in alert icon, so
 * no extra icon dependency is introduced.
 *
 * @param {{
 *   tone?: 'info' | 'warning',
 *   children: React.ReactNode,
 * } & Omit<import('@mui/material/Alert').AlertProps, 'severity' | 'color'>} props
 */
const TONE_SX = {
  info: { backgroundColor: 'info.light', borderColor: 'info.border', color: 'info.main' },
  warning: { backgroundColor: 'warning.light', borderColor: 'warning.border', color: 'warning.main' },
}

export default function AppNotice({ tone = 'info', children, sx, ...rest }) {
  const toneSx = TONE_SX[tone] ?? TONE_SX.info

  return (
    <Alert
      severity={tone}
      sx={{
        ...toneSx,
        '& .MuiAlert-message': { fontSize: 14, lineHeight: '20px', fontWeight: 600 },
        '& .MuiAlert-icon': { color: 'inherit' },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Alert>
  )
}
