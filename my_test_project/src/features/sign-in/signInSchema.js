import { z } from 'zod'

/**
 * Sign-in form validation. This is a prototype with no real backend (see
 * the "made-up password" note on the screen), so password only needs to
 * be present — no strength rules.
 */
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Enter your email address.')
    .email('Enter a valid email address.'),
  password: z.string().min(1, 'Enter your password.'),
})
