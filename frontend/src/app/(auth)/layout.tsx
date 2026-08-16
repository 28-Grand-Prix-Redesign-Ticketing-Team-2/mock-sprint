import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-start justify-center bg-[#ebf5fe] px-6 pt-12 pb-10 sm:items-center sm:px-4 sm:py-10">
      <div className="w-full max-w-[342px] sm:max-w-[400px]">{children}</div>
    </div>
  )
}
