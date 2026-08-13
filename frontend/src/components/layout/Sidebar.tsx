'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { LayoutDashboard, User, Users, Settings, LogOut } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/team', label: 'Team', icon: Users },
  // { href: '/settings', label: 'Settings', icon: Settings }, Will be place at the bottom along Sign Out
]

export function Sidebar() {
  const router = useRouter()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.replace('/auth/signin')
    router.refresh()
  }
  return (
    <aside className="hidden lg:flex w-60 flex-col border-r border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex h-14 items-center px-4 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-semibold text-sm">
          {process.env.NEXT_PUBLIC_APP_NAME ?? 'App'}
        </span>
      </div>
      <div className='flex-1 flex flex-col justify-between'>
        <nav className="flex flex-col p-3 space-y-1 ">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <nav className="flex flex-col p-3 space-y-1">
          <Link
              href={"/settings"}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <Settings className="h-4 w-4 shrink-0" />
              Settings
            </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white cursor-pointer"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </nav>
      </div>
      
    </aside>
  )
}
