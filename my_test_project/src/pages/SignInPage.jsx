import Box from '@mui/material/Box'
import IllustrationPanel from '../features/sign-in/components/IllustrationPanel'
import SignInForm from '../features/sign-in/components/SignInForm'
import { useIllustrationCarousel } from '../features/sign-in/useIllustrationCarousel'
import { illustrationSlides } from '../features/sign-in/illustrationSlides'

/**
 * Standalone sign-in screen (`/sign-in`): a split card — the illustration
 * carousel on the left, the sign-in form on the right. No auth exists in
 * this app, so a valid submit just navigates to the placeholder home
 * route (`useSignInForm`). Stacks to one column below the `md` breakpoint.
 *
 * The card shell's border, radius, and shadow are measured one-offs from
 * the Figma file (`84:4`) that don't match the theme's `AppCard`
 * treatment (2px border / 10px radius / a different shadow), so this page
 * builds the shell directly rather than stretching `AppCard` to a second,
 * conflicting look.
 */
export default function SignInPage() {
  const carousel = useIllustrationCarousel(illustrationSlides.length)

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          maxWidth: 1120,
          minWidth: 0,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '16px',
          boxShadow: '0px 24px 68px 0px rgba(16, 41, 71, 0.07)',
          overflow: 'hidden',
        }}
      >
        <IllustrationPanel
          slides={illustrationSlides}
          activeIndex={carousel.activeIndex}
          isPlaying={carousel.isPlaying}
          onTogglePlay={carousel.togglePlay}
        />
        <SignInForm />
      </Box>
    </Box>
  )
}
