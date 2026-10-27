import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { signInSchema } from './signInSchema'

/**
 * Sign-in form state. The submit button stays enabled at all times;
 * validation runs on submit (react-hook-form's `handleSubmit`), and a
 * failed submit moves focus to the first invalid field so the error is
 * both visible and reachable without a mouse. `mode: 'onChange'` is kept
 * so a field that already failed once clears its error live as the user
 * corrects it. There is no backend to call — this is a prototype screen,
 * per the form's own note — so a valid submit just navigates to the
 * placeholder home route.
 */
export function useSignInForm() {
  const navigate = useNavigate()

  const { control, handleSubmit, setFocus } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  })

  const onSubmit = handleSubmit(
    () => {
      navigate('/')
    },
    (errors) => {
      const firstInvalidField = errors.email
        ? 'email'
        : errors.password
          ? 'password'
          : undefined
      if (firstInvalidField) {
        setFocus(firstInvalidField)
      }
    },
  )

  return { control, onSubmit }
}
