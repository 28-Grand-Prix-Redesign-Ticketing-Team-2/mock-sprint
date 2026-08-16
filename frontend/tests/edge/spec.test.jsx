import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SignInPage from '../../src/app/(auth)/auth/signin/page'

const mocks = vi.hoisted(() => ({
  replace: vi.fn(),
  refresh: vi.fn(),
  signInWithEmail: vi.fn(),
  signInWithGoogle: vi.fn(),
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
}))

// Mock Next.js App Router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: mocks.replace,
    refresh: mocks.refresh,
    back: vi.fn(),
  }),
}))

// Mock authentication
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signInWithEmail: mocks.signInWithEmail,
    signInWithGoogle: mocks.signInWithGoogle,
  }),
}))

// Mock toast messages
vi.mock('sonner', () => ({
  toast: {
    error: mocks.toastError,
    success: mocks.toastSuccess,
  },
}))

beforeEach(() => {
  vi.clearAllMocks()

  window.history.replaceState({}, '', '/auth/signin')
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Edge Cases and Bugs', () => {
  it('Rejects invalid credentials', async () => {
    mocks.signInWithEmail.mockRejectedValueOnce(new Error('Invalid email or password'))

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
    expect(mocks.refresh).not.toHaveBeenCalled()
  })

  it('Displays the inline authentication error for invalid credentials without a toast', async () => {
    mocks.signInWithEmail.mockRejectedValueOnce({
      code: 'auth/invalid-credential',
      message: 'Invalid email or password',
    })

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

    const errorBanner = await screen.findByTestId('authentication-error')

    expect(errorBanner).toBeInTheDocument()
    expect(errorBanner).toHaveAttribute('role', 'alert')

    // Mobile Figma error message
    const mobileMessage = screen.getByText(
      'The email address or password you entered is incorrect!'
    )

    expect(mobileMessage).toBeInTheDocument()
    expect(mobileMessage).toHaveClass('sm:hidden')

    // Desktop Figma error message
    const desktopMessage = screen.getByText('Invalid email or password')

    expect(desktopMessage).toBeInTheDocument()
    expect(desktopMessage).toHaveClass('hidden', 'sm:inline')

    // Both messages belong to the same inline error banner.
    expect(errorBanner).toHaveTextContent('The email address or password you entered is incorrect!')

    expect(errorBanner).toHaveTextContent('Invalid email or password')

    // Invalid credentials must NOT create the old top-right toast.
    expect(mocks.toastError).not.toHaveBeenCalled()

    expect(mocks.toastSuccess).not.toHaveBeenCalled()

    // Invalid login must not redirect.
    expect(mocks.replace).not.toHaveBeenCalled()
    expect(mocks.refresh).not.toHaveBeenCalled()
  })

  it('Handles Firebase wrong-password as inline invalid credentials', async () => {
    mocks.signInWithEmail.mockRejectedValueOnce({
      code: 'auth/wrong-password',
      message: 'Firebase: Error (auth/wrong-password).',
    })

    render(<SignInPage />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {
        value: 'test@example.com',
      },
    })

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: {
        value: 'Password123!',
      },
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: /sign in/i,
      })
    )

    const errorBanner = await screen.findByTestId('authentication-error')

    expect(errorBanner).toBeInTheDocument()

    expect(screen.getByText('Invalid email or password')).toBeInTheDocument()

    expect(mocks.toastError).not.toHaveBeenCalled()
    expect(mocks.replace).not.toHaveBeenCalled()
  })

  it('Handles Firebase user-not-found as inline invalid credentials', async () => {
    mocks.signInWithEmail.mockRejectedValueOnce({
      code: 'auth/user-not-found',
      message: 'Firebase: Error (auth/user-not-found).',
    })

    render(<SignInPage />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {
        value: 'missing-user@example.com',
      },
    })

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: {
        value: 'Password123!',
      },
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: /sign in/i,
      })
    )

    await screen.findByTestId('authentication-error')

    expect(screen.getByText('Invalid email or password')).toBeInTheDocument()

    expect(mocks.toastError).not.toHaveBeenCalled()
    expect(mocks.replace).not.toHaveBeenCalled()
  })

  it('Password visibility control reveals and conceals the password without displaying an unrelated popup', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<SignInPage />)

    const passwordInput = screen.getByLabelText(/password/i)

    expect(passwordInput).toHaveAttribute('type', 'password')

    const revealButton = screen.getByRole('button', {
      name: 'Reveal value',
    })

    fireEvent.click(revealButton)

    expect(passwordInput).toHaveAttribute('type', 'text')

    expect(
      screen.getByRole('button', {
        name: 'Conceal value',
      })
    ).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Conceal value',
      })
    )

    expect(passwordInput).toHaveAttribute('type', 'password')

    expect(alertMock).not.toHaveBeenCalled()
  })
})
