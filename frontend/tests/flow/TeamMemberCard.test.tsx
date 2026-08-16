import React from 'react'
import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import TeamMemberCard from '../../src/features/team/components/TeamMemberCard'

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    onError,
    className,
  }: {
    src: string
    alt: string
    onError?: React.ReactEventHandler<HTMLImageElement>
    className?: string
  }) => <img src={src} alt={alt} onError={onError} className={className} />,
}))

const member = {
  name: 'Muhammad Rayyan Sohail',
  role: 'Business Analyst',
  blurb: 'Turns project needs into clear requirements.',
}

describe('TeamMemberCard photo fallback behaviour', () => {
  describe('T8-05 - Missing or failed member photo', () => {
    it('shows "Photo Unavailable" when no member photo is provided', () => {
      render(
        <TeamMemberCard name={member.name} role={member.role} blurb={member.blurb} image={null} />
      )

      expect(
        screen.getByRole('img', {
          name: 'Photo Unavailable',
        })
      ).toBeInTheDocument()

      expect(screen.getByText('Photo Unavailable')).toBeInTheDocument()
    })

    it('does not render a profile image when the photo is missing', () => {
      render(
        <TeamMemberCard name={member.name} role={member.role} blurb={member.blurb} image={null} />
      )

      expect(screen.queryByAltText(`${member.name} profile photo`)).not.toBeInTheDocument()

      expect(screen.getByText('Photo Unavailable')).toBeInTheDocument()
    })

    it('shows "Image failed to load" when the supplied image fails', () => {
      render(
        <TeamMemberCard
          name={member.name}
          role={member.role}
          blurb={member.blurb}
          image="/images/invalid-member-photo.jpg"
        />
      )

      const image = screen.getByAltText(`${member.name} profile photo`)

      expect(image).toBeInTheDocument()

      fireEvent.error(image)

      expect(
        screen.getByRole('img', {
          name: 'Image failed to load',
        })
      ).toBeInTheDocument()

      expect(screen.getByText('Image failed to load')).toBeInTheDocument()
    })

    it('removes the failed image after the image load error', () => {
      render(
        <TeamMemberCard
          name={member.name}
          role={member.role}
          blurb={member.blurb}
          image="/images/invalid-member-photo.jpg"
        />
      )

      const image = screen.getByAltText(`${member.name} profile photo`)

      fireEvent.error(image)

      expect(screen.queryByAltText(`${member.name} profile photo`)).not.toBeInTheDocument()

      expect(screen.getByText('Image failed to load')).toBeInTheDocument()
    })
  })

  describe('T8-06 - Member information remains visible', () => {
    it('keeps name, role and blurb visible when the photo is missing', () => {
      render(
        <TeamMemberCard name={member.name} role={member.role} blurb={member.blurb} image={null} />
      )

      expect(screen.getByText('Photo Unavailable')).toBeInTheDocument()

      expect(screen.getByText(member.name)).toBeInTheDocument()

      expect(screen.getByText(member.role)).toBeInTheDocument()

      expect(screen.getByText(member.blurb)).toBeInTheDocument()
    })

    it('keeps name, role and blurb visible when the photo fails to load', () => {
      render(
        <TeamMemberCard
          name={member.name}
          role={member.role}
          blurb={member.blurb}
          image="/images/broken-photo.jpg"
        />
      )

      const image = screen.getByAltText(`${member.name} profile photo`)

      fireEvent.error(image)

      expect(screen.getByText('Image failed to load')).toBeInTheDocument()

      expect(screen.getByText(member.name)).toBeInTheDocument()

      expect(screen.getByText(member.role)).toBeInTheDocument()

      expect(screen.getByText(member.blurb)).toBeInTheDocument()
    })

    it('does not replace member information with the image error fallback', () => {
      render(
        <TeamMemberCard
          name={member.name}
          role={member.role}
          blurb={member.blurb}
          image="/invalid/image.jpg"
        />
      )

      const image = screen.getByAltText(`${member.name} profile photo`)

      fireEvent.error(image)

      expect(screen.queryByAltText(`${member.name} profile photo`)).not.toBeInTheDocument()

      expect(screen.getByText('Image failed to load')).toBeInTheDocument()

      expect(screen.getByText(member.name)).toBeInTheDocument()

      expect(screen.getByText(member.role)).toBeInTheDocument()

      expect(screen.getByText(member.blurb)).toBeInTheDocument()
    })
  })
})
