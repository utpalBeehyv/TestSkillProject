import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/**
 * Shared step strip. Wraps the Figma file's "UI elements" board
 * (221:2371, "Navigation and drawer" → "Step specimen"): a 56px strip
 * with a 2px bottom divider, 24px round step markers, and three states
 * — completed (check mark), active (filled blue marker, tinted
 * background, blue 2px underline), and default (numbered, grey outline).
 *
 * Gap/assumption: the spec's completed marker measures a neutral grey
 * 2px border, but the board's own rendered screenshot shows the check
 * mark itself in the success green rather than grey. Closest
 * implementation: the ring stays the measured neutral grey, the check
 * glyph uses `success.main` — see the design-foundations report.
 */
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10.5L8 14.5L16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * @param {{
 *   steps: Array<{ key: string, label: string }>,
 *   activeIndex: number,
 * } & import('@mui/material/Box').BoxProps} props
 */
export default function AppStepper({ steps, activeIndex, sx, ...rest }) {
  return (
    <Box
      component="ol"
      aria-label="Progress"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        m: 0,
        p: 0,
        borderBottom: '2px solid',
        borderColor: 'divider',
        ...sx,
      }}
      {...rest}
    >
      {steps.map((step, index) => {
        const isCompleted = index < activeIndex
        const isActive = index === activeIndex

        return (
          <Box
            component="li"
            key={step.key}
            aria-current={isActive ? 'step' : undefined}
            sx={{
              flex: '1 1 136px',
              minWidth: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              height: 56,
              bgcolor: isActive ? 'info.light' : 'transparent',
              borderBottom: isActive ? '2px solid' : '2px solid transparent',
              borderColor: isActive ? 'primary.main' : 'transparent',
              mb: '-2px',
            }}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                border: isActive ? 'none' : '2px solid',
                borderColor: 'divider',
                bgcolor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'primary.contrastText' : isCompleted ? 'success.main' : 'text.secondary',
              }}
            >
              {isCompleted ? <CheckIcon /> : index + 1}
            </Box>
            <Typography
              variant="subtitle2"
              component="span"
              sx={{ color: isActive ? 'primary.dark' : 'text.secondary' }}
            >
              {step.label}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}
