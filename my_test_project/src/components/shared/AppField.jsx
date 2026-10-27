import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'

/**
 * Shared form field. Wraps MUI's `TextField` with react-hook-form's
 * `Controller` so every field renders validation the same way.
 *
 * Pair the enclosing form with zod:
 *
 *   const { control, handleSubmit } = useForm({
 *     resolver: zodResolver(schema), // from '@hookform/resolvers/zod'
 *   })
 *   <AppField name="email" control={control} label="Email" />
 *
 * `AppField` only needs `control` and `name` — it reads the error
 * message off react-hook-form's `fieldState`, whatever validator
 * produced it.
 *
 * @param {{
 *   name: string,
 *   control: import('react-hook-form').Control,
 *   label: string,
 *   type?: string,
 * }} props
 */
export default function AppField({ name, control, label, type = 'text', ...rest }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          // MUI's `TextField` forwards its own `ref` to the outer form
          // control, not the native `<input>` — `inputRef` is the prop
          // that reaches the input itself, which is what react-hook-form's
          // `setFocus` needs to actually move keyboard focus there.
          inputRef={ref}
          label={label}
          type={type}
          fullWidth
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message ?? rest.helperText}
        />
      )}
    />
  )
}
