import { describe, it, expect } from 'vitest'
import { signInSchema } from '../signInSchema'

describe('signInSchema', () => {
  it('accepts a valid email and password', () => {
    const result = signInSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(result.success).toBe(true)
    expect(result.data).toEqual({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('rejects an empty email with the required message', () => {
    const result = signInSchema.safeParse({
      email: '',
      password: 'password123',
    })

    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Enter your email address.')
  })

  it('rejects an invalid email format', () => {
    const result = signInSchema.safeParse({
      email: 'not-an-email',
      password: 'password123',
    })

    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Enter a valid email address.')
  })

  it('rejects an empty password with the required message', () => {
    const result = signInSchema.safeParse({
      email: 'test@example.com',
      password: '',
    })

    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Enter your password.')
  })

  it('rejects both fields empty', () => {
    const result = signInSchema.safeParse({
      email: '',
      password: '',
    })

    expect(result.success).toBe(false)
    const messages = result.error.issues.map((issue) => issue.message)
    expect(messages).toContain('Enter your email address.')
    expect(messages).toContain('Enter your password.')
  })
})
