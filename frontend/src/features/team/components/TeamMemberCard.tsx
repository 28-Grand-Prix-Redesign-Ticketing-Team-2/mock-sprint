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

  const isBlurbLong = blurb ? blurb.length > 80 : false
  const displayImage = image && !imageError

  return (
    <article className="mx-auto flex w-full flex-col items-center gap-3 text-center min-[1440px]:w-[380px] min-[1440px]:max-w-full min-[1440px]:gap-4 min-[1440px]:rounded-xl min-[1440px]:border min-[1440px]:border-[#a0aec0] min-[1440px]:bg-white min-[1440px]:p-5 min-[1440px]:shadow-[0_4px_6px_rgba(0,0,0,0.03)]">
      <div className="flex h-[140px] w-[220px] shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-[#a0aec0] bg-[#e2e8f0] text-[13px] text-[#606f7b] min-[1440px]:h-auto min-[1440px]:w-full min-[1440px]:border min-[1440px]:aspect-square">
        {displayImage ? (
          <Image
            src={image}
            alt={`${name} profile photo`}
            width={400}
            height={400}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="px-3 text-center">
            {image ? 'Image failed to load' : 'Photo unavailable'}
          </span>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-1 min-[1440px]:gap-1.5">
        <h3 className="w-full text-base leading-normal font-bold break-words text-[#343d4e]">
          {name}
        </h3>

        <p className="w-full text-[13px] leading-normal font-medium break-words text-[#606f7b]">
          {role}
        </p>

        {blurb && !isBlurbLong && (
          <p className="w-[280px] max-w-full text-xs leading-normal break-words text-[#545f71] min-[1440px]:w-full min-[1440px]:text-[13px] min-[1440px]:leading-[1.4] min-[1440px]:text-[#606f7b]">
            {blurb}
          </p>
        )}

        {blurb && isBlurbLong && (
          <>
            <div
              className={cn(
                'w-[280px] max-w-full text-[13px] min-[1440px]:hidden',
                expand
                  ? 'flex flex-col items-center gap-1'
                  : 'flex h-[18px] items-center whitespace-nowrap'
              )}
            >
              <p
                className={cn(
                  'text-[#606f7b]',
                  expand ? 'leading-[1.4]' : 'min-w-0 flex-1 truncate text-center'
                )}
              >
                {blurb}
              </p>

              <button
                type="button"
                onClick={() => setExpand((current) => !current)}
                className={cn(
                  'shrink-0 font-semibold underline',
                  'focus-visible:ring-2',
                  'focus-visible:ring-[#2e6bd1]',
                  'focus-visible:outline-none',
                  expand ? 'text-[#4a5568]' : 'text-[#3b82f6]'
                )}
              >
                {expand ? 'Less' : 'More'}
              </button>
            </div>

            <p className="hidden w-full text-[13px] leading-[1.4] text-[#606f7b] min-[1440px]:block">
              {blurb}
            </p>
          </>
        )}

        {!blurb && (
          <p className="w-[280px] max-w-full text-xs leading-normal text-[#545f71] min-[1440px]:w-full min-[1440px]:text-[13px] min-[1440px]:leading-[1.4] min-[1440px]:text-[#606f7b]">
            No blurb available.
          </p>
        )}
      </div>
    </article>
  )
}
