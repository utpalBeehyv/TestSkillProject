import { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import AppField from '../../../components/shared/AppField'
import eyeIcon from '../../../assets/sign-in/eye-toggle-icon.svg'
import eyeOffIcon from '../../../assets/sign-in/eye-off-icon.svg'

/**
 * Password field for the sign-in form: `AppField` plus a show/hide
 * toggle at the input's trailing edge. Feature-scoped — nothing else in
 * the app uses this toggle treatment yet, so it is not promoted to
 * `src/components/shared/`.
 *
 * The Figma file supplies one eye glyph (the "visible" state, measured
 * on the password field). There is no "hidden" counterpart in the file
 * and the repo does not install `@mui/icons-material`, so the hidden
 * state reuses that same glyph with a diagonal slash added
 * (`eye-off-icon.svg`, hand-authored at the same stroke weight/color)
 * rather than introducing a new icon-font dependency for a toggle only
 * this field uses.
 *
 * @param {{
 *   name: string,
 *   control: import('react-hook-form').Control,
 *   label: React.ReactNode,
 * } & Omit<import('@mui/material/TextField').TextFieldProps, 'type'>} props
 */
export default function PasswordField({ name, control, label, ...rest }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <AppField
      name={name}
      control={control}
      label={label}
      type={isVisible ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button"
                aria-label={isVisible ? 'Hide password' : 'Show password'}
                aria-pressed={isVisible}
                onClick={() => setIsVisible((visible) => !visible)}
                edge="end"
                sx={{ p: '4px' }}
              >
                <Box
                  component="img"
                  src={isVisible ? eyeOffIcon : eyeIcon}
                  alt=""
                  width={16}
                  height={16}
                />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...rest}
    />
  )
}
