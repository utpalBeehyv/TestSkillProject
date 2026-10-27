import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppField from '../../../components/shared/AppField'
import AppButton from '../../../components/shared/AppButton'
import PasswordField from './PasswordField'
import { useSignInForm } from '../useSignInForm'
import infoIcon from '../../../assets/sign-in/info-icon.svg'
import arrowForwardIcon from '../../../assets/sign-in/arrow-forward-icon.svg'

function RequiredMark() {
  return (
    <Box component="span" aria-hidden="true" sx={{ color: 'primary.main' }}>
      *
    </Box>
  )
}

// `required` already marks the field for assistive tech (and renders the
// matching asterisk in the floating-label notch); this just hides MUI's
// own auto-generated label asterisk so it doesn't duplicate the one in
// `RequiredMark` above, which carries the Figma-measured blue (`#1570ef`
// / `primary.main`) instead of MUI's default.
const hideAutoAsteriskSx = { '& .MuiFormLabel-asterisk': { display: 'none' } }

/**
 * Right panel of the sign-in screen: the "Welcome back" eyebrow and
 * heading, the email/password form (wired to `useSignInForm`), and the
 * prototype-only note. Composes `AppField` (email), the feature-scoped
 * `PasswordField`, and `AppButton` (submit) — no server call, no "forgot
 * password" or sign-up links (out of scope per the approved frame).
 */
export default function SignInForm() {
  const { control, onSubmit } = useSignInForm()

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{
        flex: { md: '1 1 47.5%' },
        width: { xs: '100%', md: 'auto' },
        minWidth: 0,
        display: 'flex',
        justifyContent: 'center',
        px: { xs: 3, sm: 4, md: '65px' },
        py: { xs: 4, md: '117px' },
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 390, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '14px',
            lineHeight: '21px',
            fontWeight: 700,
            color: 'primary.dark',
          }}
        >
          Welcome back
        </Typography>

        <Typography
          component="h1"
          sx={{
            fontSize: '32px',
            lineHeight: '38px',
            fontWeight: 700,
            letterSpacing: '-1.12px',
            color: 'text.primary',
            mt: '11px',
          }}
        >
          Sign in to your RFP workspace
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '17px', mt: '30px' }}>
          <AppField
            name="email"
            control={control}
            label={
              <>
                Email address <RequiredMark />
              </>
            }
            placeholder="name@example.com"
            required
            sx={hideAutoAsteriskSx}
          />

          <PasswordField
            name="password"
            control={control}
            label={
              <>
                Password <RequiredMark />
              </>
            }
            placeholder="Enter a demo password"
            required
            sx={hideAutoAsteriskSx}
          />

          <Box sx={{ pt: '7px' }}>
            <AppButton
              type="submit"
              fullWidth
              endIcon={
                <Box
                  component="img"
                  src={arrowForwardIcon}
                  alt=""
                  width={20}
                  height={20}
                />
              }
            >
              Sign in
            </AppButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: '7px', mt: '15px' }}>
          <Box
            component="img"
            src={infoIcon}
            alt=""
            width={16}
            height={16}
            sx={{ mt: '2px', flexShrink: 0 }}
          />
          <Typography
            sx={{ fontSize: '13px', lineHeight: '19.5px', color: 'text.secondary' }}
          >
            Prototype only. Use a made-up password; accounts are not verified.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
