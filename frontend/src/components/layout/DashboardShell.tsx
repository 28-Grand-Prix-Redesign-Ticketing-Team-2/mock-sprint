import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#ebf5fe]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Commented to follow UX's mockup */}
        {/* <Navbar /> */}
        <main className="flex-1 overflow-y-auto px-6 pt-6 pb-8 min-[1440px]:px-0 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}
