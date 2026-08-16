import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TeamMemberCard from '../../src/features/team/components/TeamMemberCard'

describe('TeamMemberCard mobile Figma edge cases', () => {
  describe('Long member name', () => {
    it('displays the complete long member name without truncation', () => {
      const longName = 'Alexandria-Montgomery Richardson-Smith'

      render(
        <TeamMemberCard
          name={longName}
          role="Project Manager"
          blurb="Plans the work and helps the team stay on track."
          image={null}
        />
      )

      const name = screen.getByRole('heading', {
        name: longName,
      })

      expect(name).toBeInTheDocument()
      expect(name).toHaveTextContent(longName)

      expect(name).toHaveClass(
        'w-full',
        'min-w-0',
        'whitespace-normal',
        'break-words',
        'text-center',
        'text-base',
        'leading-[1.25]',
        'font-bold',
        'text-[#343D4E]'
      )

      expect(name).not.toHaveClass('truncate')
      expect(name).not.toHaveClass('whitespace-nowrap')
      expect(name).not.toHaveClass('overflow-hidden')
      expect(name).not.toHaveClass('text-ellipsis')
    })

    it('keeps the role and blurb visible with a long member name', () => {
      const longName = 'Alexandria-Montgomery Richardson-Smith'

      render(
        <TeamMemberCard
          name={longName}
          role="Project Manager"
          blurb="Plans the work and helps the team stay on track."
          image={null}
        />
      )

      expect(
        screen.getByRole('heading', {
          name: longName,
        })
      ).toBeInTheDocument()

      expect(screen.getByText('Project Manager')).toBeInTheDocument()

      expect(
        screen.getByText('Plans the work and helps the team stay on track.')
      ).toBeInTheDocument()
    })
  })

  describe('Long role title', () => {
    it('displays the complete long role title without truncation', () => {
      const longRole = 'Lead User Experience and Accessibility Design Specialist'

      render(
        <TeamMemberCard
          name="Hui Wen Chew"
          role={longRole}
          blurb="Designs simple and easy-to-use experiences for users."
          image={null}
        />
      )

      const role = screen.getByText(longRole)

      expect(role).toBeInTheDocument()
      expect(role).toHaveTextContent(longRole)

      expect(role).toHaveClass(
        'w-full',
        'min-w-0',
        'whitespace-normal',
        'break-words',
        'text-center',
        'text-[13px]',
        'leading-[1.35]',
        'font-medium',
        'text-[#606F7B]'
      )

      expect(role).not.toHaveClass('truncate')
      expect(role).not.toHaveClass('whitespace-nowrap')
      expect(role).not.toHaveClass('overflow-hidden')
      expect(role).not.toHaveClass('text-ellipsis')
    })

    it('keeps the blurb visible below a long multi-line role title', () => {
      const longRole = 'Lead User Experience and Accessibility Design Specialist'

      const blurb = 'Designs simple and easy-to-use experiences for users.'

      render(<TeamMemberCard name="Hui Wen Chew" role={longRole} blurb={blurb} image={null} />)

      expect(screen.getByText(longRole)).toBeInTheDocument()

      expect(screen.getByText(blurb)).toBeInTheDocument()
    })
  })

  describe('Long name and role together', () => {
    it('supports both a long name and long role without clipping', () => {
      const longName = 'Alexandria-Montgomery Richardson-Smith'

      const longRole = 'Lead User Experience and Accessibility Design Specialist'

      render(
        <TeamMemberCard name={longName} role={longRole} blurb="Short test blurb." image={null} />
      )

      const name = screen.getByRole('heading', {
        name: longName,
      })

      const role = screen.getByText(longRole)

      expect(name).toBeInTheDocument()
      expect(role).toBeInTheDocument()

      expect(name).toHaveClass('w-full', 'whitespace-normal', 'break-words')

      expect(role).toHaveClass('w-full', 'whitespace-normal', 'break-words')

      expect(name).not.toHaveClass('truncate')
      expect(role).not.toHaveClass('truncate')
    })
  })

  describe('Responsive square profile image', () => {
    it('uses a square 240px mobile profile and 280px desktop profile', () => {
      render(
        <TeamMemberCard
          name="Test Member"
          role="Developer"
          blurb="Short test blurb."
          image={null}
        />
      )

      const fallback = screen.getByRole('img', {
        name: 'Photo Unavailable',
      })

      const imageContainer = fallback.parentElement

      expect(imageContainer).not.toBeNull()

      expect(imageContainer).toHaveClass(
        'relative',
        'aspect-square',
        'w-[240px]',
        'shrink-0',
        'overflow-hidden',
        'min-[1440px]:w-[280px]'
      )
    })

    it('keeps the member card white with visible spacing around the image', () => {
      render(
        <TeamMemberCard
          name="Test Member"
          role="Developer"
          blurb="Short test blurb."
          image={null}
        />
      )

      const card = screen
        .getByRole('heading', {
          name: 'Test Member',
        })
        .closest('article')

      expect(card).not.toBeNull()

      expect(card).toHaveClass('w-full', 'max-w-[342px]', 'rounded-xl', 'border', 'bg-white')
    })
  })

  describe('Long blurb mobile interaction', () => {
    it('shows More when the blurb is long', () => {
      const longBlurb =
        'This is a deliberately long team member blurb that is longer than eighty characters so the mobile expandable state is displayed.'

      render(<TeamMemberCard name="Test Member" role="Developer" blurb={longBlurb} image={null} />)

      expect(
        screen.getByRole('button', {
          name: 'More',
        })
      ).toBeInTheDocument()
    })

    it('expands and collapses a long blurb with More and Less', () => {
      const longBlurb =
        'This is a deliberately long team member blurb that is longer than eighty characters so the mobile expandable state is displayed.'

      render(<TeamMemberCard name="Test Member" role="Developer" blurb={longBlurb} image={null} />)

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
    })
  })
})
