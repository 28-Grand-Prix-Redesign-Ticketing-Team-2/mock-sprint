import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import TeamPage from '../../src/app/(dashboard)/team/page'
import { DashboardShell } from '../../src/components/layout/DashboardShell'
import { Sidebar } from '../../src/components/layout/Sidebar'
import TeamMemberCard from '../../src/features/team/components/TeamMemberCard'

vi.mock('@/actions/auth.actions', () => ({
  getServerSession: vi.fn().mockResolvedValue({ uid: 'test-user' }),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/team',
  useRouter: () => ({
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}))

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    signOut: vi.fn(),
  }),
}))

describe('Team page', () => {
  it('displays the team name and every member with a photo, name, role and blurb', async () => {
    render(await TeamPage())

    expect(
      screen.getByRole('heading', {
        name: 'Team 28 - Grand Prix Redesigning Ticketing - Team 2',
      })
    ).toBeInTheDocument()

    const members = [
      ['Egor Zvyagin', 'Project Manager'],
      ['Muhammad Rayyan Sohail', 'Business Analyst'],
      ['Hui Wen Chew', 'User Experience Design'],
      ['William Hok', 'Developer'],
      ['Sahibjeet Singh', 'Developer'],
    ]

    members.forEach(([name, role]) => {
      const heading = screen.getByRole('heading', { name })
      const card = heading.closest('article')

      expect(card).not.toBeNull()
      expect(card).toHaveTextContent(role)

      expect(card?.querySelector('img')).toHaveAttribute('alt', `${name} profile photo`)

      expect(card).toHaveTextContent(/\.$/)
    })

    expect(screen.queryByRole('button', { name: 'More' })).not.toBeInTheDocument()
  })

  it('uses the specified mobile and desktop Figma layout dimensions', async () => {
    render(await TeamPage())

    const teamHeading = screen.getByRole('heading', {
      name: /Team 28/i,
    })

    const page = teamHeading.closest('main')
    const cardLayout = page?.querySelector('section .grid.w-full')
    const cards = screen.getAllByRole('article')

    const pageHeading = screen.getByRole('heading', {
      name: 'Meet Our Team',
    })

    expect(page).toHaveClass('max-w-[1160px]')
    expect(page).toHaveClass('mx-auto')
    expect(page).toHaveClass('flex', 'gap-7', 'min-[1440px]:gap-8')

    expect(pageHeading).toHaveClass('text-[28px]', 'min-[1440px]:text-[32px]')

    expect(teamHeading).toHaveClass('w-[280px]', 'text-sm', 'min-[1440px]:text-[13px]')

    expect(cardLayout).toHaveClass(
      'grid-cols-1',
      'justify-items-center',
      'gap-8',
      'sm:grid-cols-2',
      'min-[1440px]:grid-cols-3',
      'min-[1440px]:justify-items-stretch',
      'min-[1440px]:gap-x-6',
      'min-[1440px]:gap-y-8',
      'min-[1440px]:px-10'
    )

    expect(cards).toHaveLength(5)

    cards.forEach((card) => {
      expect(card).toHaveClass(
        'mx-auto',
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'gap-3',
        'text-center',
        'min-[1440px]:w-[380px]',
        'min-[1440px]:max-w-full',
        'min-[1440px]:gap-3',
        'min-[1440px]:rounded-xl',
        'min-[1440px]:border',
        'min-[1440px]:bg-white',
        'min-[1440px]:px-4',
        'min-[1440px]:py-5'
      )

      expect(card.querySelector('img')?.parentElement).toHaveClass(
        'aspect-square',
        'w-[180px]',
        'border',
        'min-[1440px]:w-[200px]'
      )
    })
  })
})

describe('Dashboard shell Figma geometry', () => {
  it('uses the exact desktop sidebar width and removes extra desktop content padding', () => {
    const { container } = render(
      <DashboardShell>
        <div>Page content</div>
      </DashboardShell>
    )

    const desktopSidebar = container.querySelector('aside.hidden')
    const content = screen.getByText('Page content').closest('main')

    expect(desktopSidebar).toHaveClass('w-[280px]', 'border-[#9ba5b7]')

    expect(content).toHaveClass('px-6', 'pt-6', 'lg:py-10', 'min-[1440px]:px-0')
  })
})

describe('Team desktop navigation', () => {
  it('matches the Figma navigation labels, sizing and selected state', () => {
    const { container } = render(<Sidebar />)

    const desktopSidebar = container.querySelector('aside.hidden')

    expect(desktopSidebar).not.toBeNull()

    const desktopNavigation = within(desktopSidebar)

    const teamLink = desktopNavigation.getByRole('link', {
      name: 'Team',
    })

    const eventsItem = desktopNavigation.getByText('Events').closest('[aria-disabled="true"]')

    expect(teamLink).toHaveAttribute('aria-current', 'page')

    expect(eventsItem).toBeInTheDocument()

    expect(desktopSidebar).toHaveClass('w-[280px]', 'px-[22px]', 'py-7')

    expect(teamLink).toHaveClass('h-[54px]', 'w-[236px]', 'bg-[#eef1f4]', 'font-bold')

    expect(
      screen.getByRole('button', {
        name: 'Open navigation menu',
      })
    ).toBeInTheDocument()
  })
})

describe('Team member card states', () => {
  it('expands a long blurb and preserves the failed-image fallback', () => {
    const blurb =
      'A deliberately long team-member blurb used to verify the expandable content state while preserving the complete short blurbs shown in the Figma design without unnecessary truncation.'

    render(<TeamMemberCard name="Test Member" role="Tester" blurb={blurb} image="/boy.jpg" />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'More',
      })
    )

    expect(
      screen.getByRole('button', {
        name: 'Less',
      })
    ).toBeInTheDocument()

    expect(
      screen.getAllByText(blurb, {
        exact: false,
      })
    ).not.toHaveLength(0)

    fireEvent.error(screen.getByAltText('Test Member profile photo'))

    expect(screen.getByText('Image failed to load')).toBeInTheDocument()
  })

  it('renders the exact missing photo and missing blurb fallbacks', () => {
    render(<TeamMemberCard name="Test Member" role="Tester" blurb={null} image={null} />)

    expect(screen.getByText('Photo unavailable')).toBeInTheDocument()

    expect(screen.getByText('No blurb available.')).toBeInTheDocument()
  })
})
