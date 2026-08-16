import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TeamMemberCard from '../../src/features/team/components/TeamMemberCard'

describe('TeamMemberCard missing blurb fallback', () => {
  it('shows "No Blurb Available" when blurb is null', () => {
    render(<TeamMemberCard name="Test Member" role="Developer" blurb={null} image={null} />)

    expect(screen.getByText('No Blurb Available')).toBeInTheDocument()
  })

  it('shows "No Blurb Available" when blurb is an empty string', () => {
    render(<TeamMemberCard name="Test Member" role="Developer" blurb="" image={null} />)

    expect(screen.getByText('No Blurb Available')).toBeInTheDocument()
  })

  it('does not show the old missing blurb messages', () => {
    render(<TeamMemberCard name="Test Member" role="Developer" blurb={null} image={null} />)

    expect(screen.queryByText('Missing blurb')).not.toBeInTheDocument()

    expect(screen.queryByText('No blurb available.')).not.toBeInTheDocument()

    expect(screen.getByText('No Blurb Available')).toBeInTheDocument()
  })

  it('keeps the member name and role visible when the blurb is missing', () => {
    render(<TeamMemberCard name="Test Member" role="Developer" blurb={null} image={null} />)

    expect(
      screen.getByRole('heading', {
        name: 'Test Member',
      })
    ).toBeInTheDocument()

    expect(screen.getByText('Developer')).toBeInTheDocument()

    expect(screen.getByText('No Blurb Available')).toBeInTheDocument()
  })

  it('does not show More or Less when the blurb is missing', () => {
    render(<TeamMemberCard name="Test Member" role="Developer" blurb={null} image={null} />)

    expect(
      screen.queryByRole('button', {
        name: 'More',
      })
    ).not.toBeInTheDocument()

    expect(
      screen.queryByRole('button', {
        name: 'Less',
      })
    ).not.toBeInTheDocument()
  })
})
