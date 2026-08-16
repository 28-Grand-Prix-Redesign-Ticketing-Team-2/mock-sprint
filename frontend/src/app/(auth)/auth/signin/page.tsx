'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'

type SignInNotice =
  | { kind: 'invalid-credentials' }
  | { kind: 'error'; message: string }
  | { kind: 'success'; message: string }

const INVALID_CREDENTIAL_CODES = new Set([
  'auth/invalid-credential',
  'auth/invalid-email',
  'auth/invalid-login-credentials',
  'auth/user-not-found',
  'auth/wrong-password',
])

function isInvalidCredentialsError(error: unknown): boolean {
  const candidate =
    typeof error === 'object' && error !== null
      ? (error as { code?: unknown; message?: unknown })
      : null

  const code = typeof candidate?.code === 'string' ? candidate.code.toLowerCase() : ''

  const message =
    typeof candidate?.message === 'string'
      ? candidate.message.toLowerCase()
      : typeof error === 'string'
        ? error.toLowerCase()
        : ''

  return (
    INVALID_CREDENTIAL_CODES.has(code) ||
    message.includes('invalid credential') ||
    message.includes('invalid email or password') ||
    message.includes('invalid login credentials') ||
    message.includes('wrong-password') ||
    message.includes('user-not-found')
  )
}

function wait(milliseconds: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

export default function SignInPage() {
  const router = useRouter()

  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const [signInNotice, setSignInNotice] = useState<SignInNotice | null>(null)

  const [showPassword, setShowPassword] = useState(false)

  /*
   * Prevent the existing authenticated-user redirect from
   * immediately hiding the successful-login Figma state.
   */
  const loginStartedHere = useRef(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user && !loginStartedHere.current) {
      router.replace('/team')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) {
    return <FullPageSpinner />
  }

  const showSuccessAndRedirect = async () => {
    setSignInNotice({
      kind: 'success',
      message: 'Signed in successfully',
    })

    /*
     * Briefly keep the successful-login state visible so the
     * user can actually see the Figma success banner.
     */
    await wait(1000)

    router.replace('/team')
    router.refresh()
  }

  const onSubmit = async (data: LoginInput) => {
    setSignInNotice(null)
    loginStartedHere.current = true

    try {
      await signInWithEmail(data.email, data.password)

      /*
       * No toast.success() here.
       * Success is displayed using the inline Figma banner.
       */
      await showSuccessAndRedirect()
    } catch (error: unknown) {
      loginStartedHere.current = false

      const errorMessage = error instanceof Error ? error.message.toLowerCase() : ''

      if (errorMessage.includes('email-not-verified')) {
        setSignInNotice({
          kind: 'error',
          message: 'Please verify your email before signing in.',
        })
      } else if (isInvalidCredentialsError(error)) {
        /*
         * No toast for invalid credentials.
         * Only the inline Figma error banner is shown.
         */
        setSignInNotice({
          kind: 'invalid-credentials',
        })
      } else {
        const message =
          'We could not sign you in because the authentication service returned an unexpected response. Please check your connection and try again!'

        setSignInNotice({
          kind: 'error',
          message,
        })

        toast.error(message)
      }
    }
  }

  const handleGoogleSignIn = async () => {
    setSignInNotice(null)
    loginStartedHere.current = true

    try {
      await signInWithGoogle()

      /*
       * Successful Google sign-in uses the same
       * inline success state instead of a toast.
       */
      await showSuccessAndRedirect()
    } catch {
      loginStartedHere.current = false

      toast.error('Google sign-in failed. Please try again.')
    }
  }

  const isSuccess = signInNotice?.kind === 'success'

  return (
    <main className="flex w-full flex-col gap-[18px] text-[#545f71] sm:gap-4">
      <header className="flex flex-col gap-[18px] text-center sm:gap-4">
        <h1 className="text-[32px] leading-[normal] font-bold sm:text-[48px]">Welcome back!</h1>

        <p className="text-base leading-[normal]">Sign in to continue to your account.</p>
      </header>

      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex h-[50px] w-full items-center justify-center gap-3 rounded-[6px] border border-[#9ba5b7] bg-white px-4 text-base font-bold transition-colors hover:bg-[#eef1f4] focus-visible:ring-2 focus-visible:ring-[#2e6bd1] focus-visible:outline-none"
        >
          <span aria-hidden="true">G</span>
          Continue with Google
        </button>

        <div className="flex h-[19px] items-center gap-3 sm:h-[17px]" aria-label="or">
          <span className="h-px flex-1 bg-[#9ba5b7]/80" />

          <span className="text-sm sm:text-xs">OR</span>

          <span className="h-px flex-1 bg-[#9ba5b7]/80" />
        </div>

        {/* Authentication success/error banner */}
        {signInNotice && (
          <p
            role={isSuccess ? 'status' : 'alert'}
            data-testid={isSuccess ? 'authentication-success' : 'authentication-error'}
            className={
              isSuccess
                ? 'flex min-h-[58px] items-center justify-center rounded-[6px] border border-[#16a34a] bg-[#ecfdf3] px-3 py-2.5 text-center text-base text-[#15803d]'
                : 'flex min-h-[58px] items-center rounded-[6px] border border-[#dc2626] bg-[#ffeeee] px-3 py-2.5 text-left text-base text-[#b91c1c] sm:justify-center sm:text-center'
            }
          >
            {signInNotice.kind === 'invalid-credentials' ? (
              <>
                {/* Mobile Figma message */}
                <span className="sm:hidden">
                  The email address or password you entered is incorrect!
                </span>

                {/* Desktop Figma message */}
                <span className="hidden sm:inline">Invalid email or password</span>
              </>
            ) : (
              signInNotice.message
            )}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-base sm:text-sm">
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="h-[50px] w-full rounded-[6px] border border-[#545f71] bg-white px-[14px] text-base text-[#545f71] placeholder:text-[#545f71] focus-visible:ring-2 focus-visible:ring-[#2e6bd1] focus-visible:outline-none aria-invalid:border-[#dc2626]"
              placeholder="you@example.com"
              {...register('email')}
            />

            {errors.email && (
              <p id="email-error" className="text-xs text-[#b91c1c]" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-base sm:text-sm">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className="h-[50px] w-full rounded-[6px] border border-[#545f71] bg-white px-[14px] pr-12 text-base text-[#545f71] placeholder:text-[#545f71] focus-visible:ring-2 focus-visible:ring-[#2e6bd1] focus-visible:outline-none aria-invalid:border-[#dc2626]"
                placeholder="••••••••"
                {...register('password')}
              />

              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Conceal value' : 'Reveal value'}
                className="absolute top-1/2 right-[13px] flex size-6 -translate-y-1/2 items-center justify-center rounded-sm focus-visible:ring-2 focus-visible:ring-[#2e6bd1] focus-visible:outline-none"
              >
                <Image
                  src="/visibility_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"
                  alt="Visibility"
                  width={20}
                  height={20}
                  className="size-5 opacity-70"
                />
              </button>
            </div>

            {errors.password && (
              <p id="password-error" className="text-xs text-[#b91c1c]" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[50px] w-full rounded-[6px] bg-[#545f71] px-4 text-base font-bold text-white transition-colors hover:bg-[#454f60] focus-visible:ring-2 focus-visible:ring-[#2e6bd1] focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-65"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  )
}
