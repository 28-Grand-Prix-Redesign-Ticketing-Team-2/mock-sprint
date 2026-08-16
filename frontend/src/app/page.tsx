import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Grand Prix Ticketing — Team 2',
  description: 'Australian Grand Prix Redesign Ticketing Experience & Team Portal',
}

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#ebf5fe] p-8 text-[#545f71]">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#343d4e] sm:text-5xl">
          Grand Prix Ticketing Redesign
        </h1>
        <p className="max-w-lg text-lg text-[#606f7b]">
          Welcome to the Australian Grand Prix Team 2 project portal. Explore our fan-centric ticketing concept and meet our team.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/auth/signin"
          className="inline-flex h-[48px] items-center justify-center rounded-[6px] bg-[#545f71] px-8 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#454f60] focus-visible:ring-2 focus-visible:ring-[#2e6bd1] focus-visible:outline-none"
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="inline-flex h-[48px] items-center justify-center rounded-[6px] border border-[#9ba5b7] bg-white px-8 text-base font-bold text-[#545f71] shadow-sm transition-colors hover:bg-[#eef1f4] focus-visible:ring-2 focus-visible:ring-[#2e6bd1] focus-visible:outline-none"
        >
          Create Account
        </Link>
      </div>
    </main>
  )
}
