'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  LogOut,
  Settings,
  Users,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BriefcaseBusiness },
  { href: '/team', label: 'Team', icon: Users },
  { href: null, label: 'Events', icon: CalendarDays },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.replace('/auth/signin')
    router.refresh()
  }

  return (
    <aside className="hidden w-[280px] shrink-0 flex-col border-r border-[#9ba5b7] bg-[#ebf5fe] px-[22px] py-7 lg:flex">
      <nav className="flex flex-col gap-3" aria-label="Primary navigation">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === pathname
          const className = cn(
            'flex h-[54px] w-[236px] items-center gap-3 rounded-lg pr-3 pl-[14px] text-base font-medium text-[#545f71]',
            active && 'bg-[#eef1f4] font-bold'
          )
          const content = (
            <>
              <Icon aria-hidden="true" className="size-[22px] shrink-0" />
              <span>{label}</span>
              <span className="min-w-px flex-1" />
              <ChevronRight aria-hidden="true" className="h-[22px] w-[18px] shrink-0" />
            </>
          )

          return href ? (
            <Link
              key={label}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={className}
            >
              {content}
            </Link>
          ) : (
            <span key={label} aria-disabled="true" className={className}>
              {content}
            </span>
          )
        })}
      </nav>

      <nav className="mt-auto flex flex-col gap-3" aria-label="Account navigation">
        <Link
          href="/settings"
          className="flex h-[46px] w-[236px] items-center gap-3 rounded-lg pr-3 pl-[14px] text-base text-[#545f71]"
        >
          <Settings aria-hidden="true" className="size-[22px] shrink-0" />
          <span>Settings</span>
          <span className="min-w-px flex-1" />
          <ChevronRight aria-hidden="true" className="h-[22px] w-[18px] shrink-0" />
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex h-[46px] w-[236px] cursor-pointer items-center gap-3 rounded-lg pr-3 pl-[14px] text-base text-[#545f71]"
          aria-label="Sign out"
        >
          <LogOut aria-hidden="true" className="size-[22px] shrink-0" />
          <span>Sign Out</span>
          <span className="min-w-px flex-1" />
          <ChevronRight aria-hidden="true" className="h-[22px] w-[18px] shrink-0" />
        </button>
      </nav>
    </aside>
  )
}
