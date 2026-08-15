import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SignInPage from '../../src/app/(auth)/auth/signin/page'

const mocks = vi.hoisted(() => ({
  replace: vi.fn(),
  refresh: vi.fn(),
  signInWithEmail: vi.fn(),
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
}))

// Mocks the Next.js App Router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: mocks.replace,
    refresh: mocks.refresh,
    back: vi.fn(),
  }),
}))

// Mocks authentication
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signInWithEmail: mocks.signInWithEmail,
    signInWithGoogle: vi.fn(),
  }),
}))

// Mocks toast messages
vi.mock('sonner', () => ({
  toast: {
    error: mocks.toastError,
    success: mocks.toastSuccess,
  },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Edge Cases and Bugs', () => {
  it('Rejects invalid credentials', async () => {
    mocks.signInWithEmail.mockRejectedValueOnce(
      new Error('Invalid email or password')
    )

    render(<SignInPage />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {
        value: 'invalid-user@example.com',
      },
    })

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: {
        value: 'wrong-password',
      },
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: /sign in/i,
      })
    )

    await waitFor(() => {
      expect(mocks.signInWithEmail).toHaveBeenCalledWith(
        'invalid-user@example.com',
        'wrong-password'
      )
    })

    expect(mocks.replace).not.toHaveBeenCalled()
  })

  it('Displays the existing authentication error for invalid credentials', async () => {
    mocks.signInWithEmail.mockRejectedValueOnce(
      new Error('Invalid email or password')
    )

    render(<SignInPage />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {
        value: 'invalid-user@example.com',
      },
    })

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: {
        value: 'wrong-password',
      },
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: /sign in/i,
      })
    )

    await waitFor(() => {
      expect(mocks.toastError).toHaveBeenCalledWith(
        'Invalid email or password'
      )
    })
  })

  it('Password visibility control does not display an unrelated popup', () => {
    const alertMock = vi
      .spyOn(window, 'alert')
      .mockImplementation(() => {})

    render(<SignInPage />)

    fireEvent.click(
      screen.getByAltText(/visibility/i)
    )

    expect(alertMock).not.toHaveBeenCalled()
  })
})