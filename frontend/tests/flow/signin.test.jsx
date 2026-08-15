  import { render, screen } from '@testing-library/react'
  import { describe, it, expect, vi } from 'vitest'
  import SignInPage from '../../src/app/(auth)/auth/signin/page'

  // Mocks the Next.js App Router
  vi.mock('next/navigation', () => ({
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
    }),
  }))

  // Mock authentication hook
  vi.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({
      user: null,
      loading: false,
      signInWithEmail: vi.fn(),
      signInWithGoogle: vi.fn(),
    }),
  }))

  describe('Login page test', () => {
    it('displays email and password fields', () => {
      render(<SignInPage />)

      expect(
        screen.getByLabelText(/email/i)
      ).toBeInTheDocument()

      expect(
        screen.getByLabelText(/password/i)
      ).toBeInTheDocument()
    })

    it('displays the login button', () => {
      render(<SignInPage />)

      expect(
        screen.getByRole('button', { name: /sign in/i })
      ).toBeInTheDocument()
    })
  })