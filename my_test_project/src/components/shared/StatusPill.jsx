import Chip from '@mui/material/Chip'

/**
 * Shared status pill. Wraps MUI's `Chip` with the tone treatments
 * measured on the Figma file's "UI elements" board (221:2371, "Status
 * pills" — "Needs decision", "Needs review", "Passed", "In progress",
 * "Strong fit") and the "Foundations" board's semantic color pairs
 * (221:2189, "Color roles"): pill radius, 12/2px padding, Inter 14/20
 * Medium, background/text pair per tone.
 *
 * `info` and `pending` are two distinct amber/blue tones the file itself
 * keeps separate from `warning` (its own "Review / pending" swatch), so
 * both are kept as separate tones here rather than collapsed into one.
 *
 * @param {{
 *   tone?: 'info' | 'pending' | 'success' | 'warning' | 'error',
 *   label: string,
 * } & Omit<import('@mui/material/Chip').ChipProps, 'label' | 'color'>} props
 */
const TONE_SX = {
  info: { backgroundColor: 'info.light', color: 'info.main' },
  pending: { backgroundColor: 'pending.light', color: 'pending.main' },
  success: { backgroundColor: 'success.light', color: 'success.main' },
  warning: { backgroundColor: 'warning.light', color: 'warning.main' },
  error: {
    backgroundColor: 'background.paper',
    color: 'error.main',
    border: '1px solid',
    borderColor: 'error.main',
  },
}

export default function StatusPill({ tone = 'info', label, sx, ...rest }) {
  const toneSx = TONE_SX[tone] ?? TONE_SX.info

  return (
    <Chip
      label={label}
      sx={{
        ...toneSx,
        height: 24,
        borderRadius: 999,
        fontSize: 14,
        lineHeight: '20px',
        fontWeight: 500,
        '& .MuiChip-label': { px: 1.5 },
        ...sx,
      }}
      {...rest}
    />
  )
}
