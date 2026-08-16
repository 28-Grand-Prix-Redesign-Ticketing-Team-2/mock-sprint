'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [mobileMenuOpen])

  const handleSignOut = async () => {
    setMobileMenuOpen(false)

    await signOut()

    router.replace('/auth/signin')
    router.refresh()
  }

  const renderNavigation = (mobile = false) => (
    <>
      <nav className="flex flex-col gap-3" aria-label="Primary navigation">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === pathname

          const className = cn(
            'flex h-[54px] items-center gap-3 rounded-lg pr-3 pl-[14px] text-base font-medium text-[#545f71]',
            mobile ? 'w-full' : 'w-[236px]',
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
              onClick={() => setMobileMenuOpen(false)}
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
          onClick={() => setMobileMenuOpen(false)}
          className={cn(
            'flex h-[46px] items-center gap-3 rounded-lg pr-3 pl-[14px] text-base text-[#545f71]',
            mobile ? 'w-full' : 'w-[236px]'
          )}
        >
          <Settings aria-hidden="true" className="size-[22px] shrink-0" />

          <span>Settings</span>

          <span className="min-w-px flex-1" />

          <ChevronRight aria-hidden="true" className="h-[22px] w-[18px] shrink-0" />
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          aria-label="Sign out"
          className={cn(
            'flex h-[46px] cursor-pointer items-center gap-3 rounded-lg pr-3 pl-[14px] text-base text-[#545f71]',
            mobile ? 'w-full' : 'w-[236px]'
          )}
        >
          <LogOut aria-hidden="true" className="size-[22px] shrink-0" />

          <span>Sign Out</span>

          <span className="min-w-px flex-1" />

          <ChevronRight aria-hidden="true" className="h-[22px] w-[18px] shrink-0" />
        </button>
      </nav>
    </>
  )

  return (
    <>
      {/* Mobile hamburger icon only */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={mobileMenuOpen}
        className="fixed top-3 left-3 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-[#a0aec0] bg-white text-[#545f71] shadow-sm transition-colors hover:bg-[#eef1f4] focus-visible:ring-2 focus-visible:ring-[#2e6bd1] focus-visible:outline-none lg:hidden"
      >
        <Menu aria-hidden="true" className="h-6 w-6" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden w-[280px] shrink-0 flex-col border-r border-[#9ba5b7] bg-[#ebf5fe] px-[22px] py-7 lg:flex">
        {renderNavigation()}
      </aside>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          mobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        )}
      >
        {/* Overlay */}
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileMenuOpen(false)}
          className={cn(
            'absolute inset-0 bg-black/35 transition-opacity duration-200',
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Mobile sidebar */}
        <aside
          className={cn(
            'absolute top-0 left-0 flex h-full w-[280px] max-w-[85vw] flex-col',
            'border-r border-[#9ba5b7] bg-[#ebf5fe] shadow-xl',
            'transition-transform duration-300 ease-out',
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
          aria-label="Mobile navigation"
        >
          {/* Close button */}
          <div className="flex h-14 shrink-0 items-center justify-end px-[18px]">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#545f71] transition-colors hover:bg-[#dceaf6] focus-visible:ring-2 focus-visible:ring-[#2e6bd1] focus-visible:outline-none"
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-[22px] pb-6">
            {renderNavigation(true)}
          </div>
        </aside>
      </div>
    </>
  )
}
