import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
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

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('displays the login button', () => {
    render(<SignInPage />)

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('uses the exact Figma mobile and desktop control typography', () => {
    render(<SignInPage />)

    expect(screen.getByRole('heading', { name: 'Welcome back!' })).toHaveClass(
      'text-[32px]',
      'sm:text-[48px]'
    )
    expect(screen.getByLabelText('Email')).toHaveClass('h-[50px]', 'rounded-[6px]')
    expect(screen.getByText('Email')).toHaveClass('text-base', 'sm:text-sm')
    expect(screen.getByText('OR')).toHaveClass('text-sm', 'sm:text-xs')
  })
})
