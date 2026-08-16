import { fireEvent, render, screen } from '@testing-library/react'
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
  it('displays the team heading, subtitle, team name and every member', async () => {
    render(await TeamPage())

    expect(
      screen.getByRole('heading', {
        name: 'Meet Our Team',
      })
    ).toBeInTheDocument()

    expect(screen.getByText('Get to know the people behind our project')).toBeInTheDocument()

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
      const heading = screen.getByRole('heading', {
        name,
      })

      const card = heading.closest('article')

      expect(card).not.toBeNull()
      expect(card).toHaveTextContent(role)

      expect(card?.querySelector('img')).toHaveAttribute('alt', `${name} profile photo`)

      expect(card).toHaveTextContent(/\.$/)
    })

    /*
     * All normal team blurbs are short, so More should not
     * appear on the standard Team page.
     */
    expect(
      screen.queryByRole('button', {
        name: 'More',
      })
    ).not.toBeInTheDocument()
  })

  it('uses one card per row on mobile and three cards per row on desktop', async () => {
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

    const subtitle = screen.getByText('Get to know the people behind our project')

    expect(page).toHaveClass('max-w-[1160px]', 'mx-auto', 'flex', 'gap-7', 'min-[1440px]:gap-8')

    expect(pageHeading).toHaveClass('text-[28px]', 'min-[1440px]:text-[32px]')

    expect(subtitle).toHaveClass('text-[#606F7B]')

    expect(teamHeading).toHaveClass(
      'w-[280px]',
      'text-sm',
      'text-[#343D4E]',
      'min-[1440px]:text-[13px]'
    )

    expect(cardLayout).not.toBeNull()

    expect(cardLayout).toHaveClass(
      'grid-cols-1',
      'justify-items-center',
      'gap-8',
      'min-[1440px]:grid-cols-3',
      'min-[1440px]:justify-items-stretch',
      'min-[1440px]:gap-x-6',
      'min-[1440px]:gap-y-8',
      'min-[1440px]:px-10'
    )

    /*
     * There must not be a two-column tablet/mobile state.
     */
    expect(cardLayout).not.toHaveClass('sm:grid-cols-2')

    expect(cards).toHaveLength(5)
  })

  it('uses the updated responsive white profile cards and square images', async () => {
    render(await TeamPage())

    const cards = screen.getAllByRole('article')

    expect(cards).toHaveLength(5)

    cards.forEach((card) => {
      expect(card).toHaveClass(
        'flex',
        'w-full',
        'max-w-[342px]',
        'min-w-0',
        'gap-3',
        'rounded-xl',
        'border',
        'border-[#a0aec0]',
        'bg-white',
        'px-5',
        'pt-7',
        'pb-5',
        'min-[1440px]:w-[344px]',
        'min-[1440px]:gap-4',
        'min-[1440px]:p-5'
      )

      const image = card.querySelector('img')

      expect(image).not.toBeNull()

      const imageContainer = image?.parentElement

      expect(imageContainer).not.toBeNull()

      expect(imageContainer).toHaveClass(
        'relative',
        'aspect-square',
        'w-[240px]',
        'shrink-0',
        'overflow-hidden',
        'rounded-lg',
        'border-2',
        'min-[1440px]:w-[280px]',
        'min-[1440px]:border'
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

    expect(
      screen.getByRole('link', {
        name: 'Team',
      })
    ).toHaveAttribute('aria-current', 'page')

    expect(screen.getByText('Events').closest('[aria-disabled="true"]')).toBeInTheDocument()

    const desktopSidebar = container.querySelector('aside')

    const teamLink = screen.getByRole('link', {
      name: 'Team',
    })

    expect(desktopSidebar).toHaveClass('w-[280px]', 'px-[22px]', 'py-7')

    expect(teamLink).toHaveClass('h-[54px]', 'w-[236px]', 'bg-[#eef1f4]', 'font-bold')
  })
})

describe('Team member card states', () => {
  it('expands and collapses a long blurb and preserves the failed-image fallback', () => {
    const blurb =
      'A deliberately long team-member blurb used to verify the expandable content state while preserving the complete short blurbs shown in the Figma design without unnecessary truncation.'

    render(<TeamMemberCard name="Test Member" role="Tester" blurb={blurb} image="/boy.jpg" />)

    const moreButton = screen.getByRole('button', {
      name: 'More',
    })

    expect(moreButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(moreButton)

    const lessButton = screen.getByRole('button', {
      name: 'Less',
    })

    expect(lessButton).toBeInTheDocument()

    expect(lessButton).toHaveAttribute('aria-expanded', 'true')

    expect(
      screen.getAllByText(blurb, {
        exact: false,
      })
    ).not.toHaveLength(0)

    fireEvent.click(lessButton)

    expect(
      screen.getByRole('button', {
        name: 'More',
      })
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('button', {
        name: 'Less',
      })
    ).not.toBeInTheDocument()

    fireEvent.error(screen.getByAltText('Test Member profile photo'))

    expect(screen.getByText('Image failed to load')).toBeInTheDocument()
  })

  it('renders the exact missing photo and missing blurb fallbacks', () => {
    render(<TeamMemberCard name="Test Member" role="Tester" blurb={null} image={null} />)

    expect(screen.getByText('Photo Unavailable')).toBeInTheDocument()

    expect(screen.getByText('No Blurb Available')).toBeInTheDocument()
  })

  it('keeps member information visible when the photo and blurb are missing', () => {
    render(<TeamMemberCard name="Test Member" role="Tester" blurb={null} image={null} />)

    expect(
      screen.getByRole('heading', {
        name: 'Test Member',
      })
    ).toBeInTheDocument()

    expect(screen.getByText('Tester')).toBeInTheDocument()

    expect(screen.getByText('Photo Unavailable')).toBeInTheDocument()

    expect(screen.getByText('No Blurb Available')).toBeInTheDocument()
  })
})
