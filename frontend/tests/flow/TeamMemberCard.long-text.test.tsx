import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TeamMemberCard from '../../src/features/team/components/TeamMemberCard'

describe('TeamMemberCard mobile long text behaviour', () => {
  it('displays the complete long member name', () => {
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
  })

  it('allows a long member name to wrap without truncation', () => {
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

    expect(name.className).not.toContain('line-clamp')
  })

  it('displays the complete long role title', () => {
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
  })

  it('allows a long role title to wrap to multiple lines without truncation', () => {
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

    expect(role.className).not.toContain('line-clamp')
  })

  it('keeps the blurb visible below a long role title', () => {
    const longRole = 'Lead User Experience and Accessibility Design Specialist'

    const blurb = 'Designs simple and easy-to-use experiences for users.'

    render(<TeamMemberCard name="Hui Wen Chew" role={longRole} blurb={blurb} image={null} />)

    expect(screen.getByText(longRole)).toBeInTheDocument()

    expect(screen.getByText(blurb)).toBeInTheDocument()
  })

  it('supports a long name and long role at the same time', () => {
    const longName = 'Alexandria-Montgomery Richardson-Smith'

    const longRole = 'Lead User Experience and Accessibility Design Specialist'

    render(
      <TeamMemberCard
        name={longName}
        role={longRole}
        blurb="Member information remains visible."
        image={null}
      />
    )

    const name = screen.getByRole('heading', {
      name: longName,
    })

    const role = screen.getByText(longRole)

    expect(name).toBeInTheDocument()
    expect(role).toBeInTheDocument()

    expect(name).toHaveClass('whitespace-normal', 'break-words')

    expect(role).toHaveClass('whitespace-normal', 'break-words')

    expect(name).not.toHaveClass('truncate')
    expect(role).not.toHaveClass('truncate')

    expect(screen.getByText('Member information remains visible.')).toBeInTheDocument()
  })

  it('does not use a fixed height for the member information container', () => {
    render(
      <TeamMemberCard
        name="Alexandria-Montgomery Richardson-Smith"
        role="Lead User Experience and Accessibility Design Specialist"
        blurb="Member information remains visible."
        image={null}
      />
    )

    const name = screen.getByRole('heading', {
      name: 'Alexandria-Montgomery Richardson-Smith',
    })

    const textContainer = name.parentElement

    expect(textContainer).not.toBeNull()

    expect(textContainer).toHaveClass('flex', 'w-full', 'min-w-0', 'flex-col')

    expect(textContainer?.className).not.toMatch(/(?:^|\s)h-\[/)
  })
})
