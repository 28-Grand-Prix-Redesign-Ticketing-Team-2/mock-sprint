'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  name: string
  role: string
  blurb: string | null
  image: string | null
}

export default function TeamMemberCard({ name, role, blurb, image }: Props) {
  const [expand, setExpand] = useState(false)
  const [imageError, setImageError] = useState(false)

  const isBlurbLong = Boolean(blurb && blurb.length > 80)

  return (
    <article className="mx-auto flex w-full max-w-[342px] min-w-0 flex-col items-center gap-3 rounded-xl border border-[#a0aec0] bg-white px-5 pt-7 pb-5 text-center shadow-[0_4px_6px_rgba(0,0,0,0.03)] min-[1440px]:w-[344px] min-[1440px]:max-w-full min-[1440px]:gap-4 min-[1440px]:p-5">
      {' '}
      {/* Responsive square profile image */}
      <div className="relative flex aspect-square w-[240px] shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-[#a0aec0] bg-[#e2e8f0] text-[13px] text-[#606F7B] min-[1440px]:w-[280px] min-[1440px]:border">
        {image && !imageError && (
          <Image
            src={image}
            alt={`${name} profile photo`}
            fill
            sizes="(max-width: 1439px) 240px, 280px"
            onError={() => setImageError(true)}
            className="object-cover"
          />
        )}

        {!image && (
          <span
            role="img"
            aria-label="Photo Unavailable"
            className="relative z-10 px-3 text-center"
          >
            Photo Unavailable
          </span>
        )}

        {image && imageError && (
          <span
            role="img"
            aria-label="Image failed to load"
            className="relative z-10 px-3 text-center"
          >
            Image failed to load
          </span>
        )}
      </div>
      {/* Member information */}
      <div className="flex w-full min-w-0 flex-col items-center gap-1 px-2 min-[1440px]:gap-1.5 min-[1440px]:px-0">
        {/* Long names use full available width and wrap naturally */}
        <h3 className="w-full min-w-0 px-1 text-center text-base leading-[1.25] font-bold break-words whitespace-normal text-[#343D4E]">
          {name}
        </h3>

        {/* Long role titles can wrap to multiple lines */}
        <p className="w-full min-w-0 px-1 text-center text-[13px] leading-[1.35] font-medium break-words whitespace-normal text-[#606F7B]">
          {role}
        </p>

        {/* Short / standard blurb */}
        {blurb && !isBlurbLong && (
          <p className="w-[280px] max-w-full text-center text-[13px] leading-[1.4] break-words whitespace-normal text-[#606F7B] min-[1440px]:w-full">
            {blurb}
          </p>
        )}

        {/* Long blurb */}
        {blurb && isBlurbLong && (
          <>
            {/* Mobile collapsed */}
            {!expand && (
              <div className="flex h-[18px] w-[280px] max-w-full items-center text-[13px] whitespace-nowrap min-[1440px]:hidden">
                <p className="min-w-0 flex-1 truncate text-center leading-[1.4] text-[#606F7B]">
                  {blurb}
                </p>

                <button
                  type="button"
                  onClick={() => setExpand(true)}
                  aria-expanded="false"
                  className={cn(
                    'shrink-0 leading-normal font-semibold text-[#3b82f6] underline',
                    'focus-visible:ring-2',
                    'focus-visible:ring-[#2e6bd1]',
                    'focus-visible:outline-none'
                  )}
                >
                  More
                </button>
              </div>
            )}

            {/* Mobile expanded */}
            {expand && (
              <div className="flex w-[280px] max-w-full flex-col items-center gap-1 text-[13px] min-[1440px]:hidden">
                <p className="w-full text-center leading-[1.4] break-words whitespace-normal text-[#606F7B]">
                  {blurb}
                </p>

                <button
                  type="button"
                  onClick={() => setExpand(false)}
                  aria-expanded="true"
                  className={cn(
                    'shrink-0 leading-normal font-semibold text-[#4a5568] underline',
                    'focus-visible:ring-2',
                    'focus-visible:ring-[#2e6bd1]',
                    'focus-visible:outline-none'
                  )}
                >
                  Less
                </button>
              </div>
            )}

            {/* Desktop always displays full blurb */}
            <p className="hidden w-full text-center text-[13px] leading-[1.4] break-words whitespace-normal text-[#606F7B] min-[1440px]:block">
              {blurb}
            </p>
          </>
        )}

        {/* Missing blurb */}
        {!blurb && (
          <p className="w-[280px] max-w-full text-center text-[13px] leading-[1.4] break-words whitespace-normal text-[#606F7B] min-[1440px]:w-full">
            No Blurb Available
          </p>
        )}
      </div>
    </article>
  )
}
