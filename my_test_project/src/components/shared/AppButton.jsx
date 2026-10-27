import MuiButton from '@mui/material/Button'

/**
 * Shared button. Wraps MUI's `Button` with the three treatments measured
 * on the Figma file's "UI elements" board (221:2371, "Button styles"):
 * `primary` (filled action blue), `secondary` (white, 2px grey border),
 * and `text` (no fill, blue label) — plus the disabled state, which the
 * file shows as the same fill at 50% opacity rather than MUI's default
 * greyed-out look.
 *
 * All three are 40px tall, radius 8px, Inter 16/24 Regular — set globally
 * in `src/theme/theme.js`'s `MuiButton` override, so this wrapper only
 * supplies the per-variant color treatment.
 *
 * @param {{
 *   variant?: 'primary' | 'secondary' | 'text',
 *   startIcon?: React.ReactNode,
 *   endIcon?: React.ReactNode,
 *   children: React.ReactNode,
 * } & Omit<import('@mui/material/Button').ButtonProps, 'variant' | 'color'>} props
 */
export default function AppButton({ variant = 'primary', sx, ...rest }) {
  if (variant === 'secondary') {
    return (
      <MuiButton
        variant="outlined"
        sx={{
          borderWidth: 2,
          borderColor: 'divider',
          color: 'text.secondary',
          backgroundColor: 'background.paper',
          '&:hover': { borderWidth: 2, borderColor: 'divider', backgroundColor: 'action.hover' },
          ...sx,
        }}
        {...rest}
      />
    )
  }

  if (variant === 'text') {
    return (
      <MuiButton
        variant="text"
        sx={{
          color: 'primary.dark',
          px: 1.5,
          '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
          ...sx,
        }}
        {...rest}
      />
    )
  }

  return (
    <MuiButton
      variant="contained"
      color="primary"
      sx={{
        // Figma's disabled state is the primary fill at 50% opacity, not
        // MUI's default greyed-out disabled look.
        '&.Mui-disabled': {
          opacity: 0.5,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        },
        ...sx,
      }}
      {...rest}
    />
  )
}
