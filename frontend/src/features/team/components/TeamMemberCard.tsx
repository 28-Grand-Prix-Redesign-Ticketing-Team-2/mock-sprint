"use client"

import Image from "next/image"
import { useState } from "react"

type Props = {
    name: string,
    role: string,
    blurb: string | null,
    image: string | null
}

export default function TeamMemberCard( { name, role, blurb, image }: Props) {
    const [expand, setExpand] = useState<boolean>(false)

    const isBlurbLong = blurb ? blurb.length > 20 : false
    const displayBlurb = blurb && isBlurbLong && !expand
        ? blurb.slice(0, 20) + "..."
        : blurb

    return (
        <div className='border rounded-2xl bg-white p-4'>
            <div className="flex flex-col items-center justify-center max-w-[300px]">
                <div className="border bg-gray-100 mb-4">
                    {image ? (
                        <Image
                            src={image}
                            alt="Photo"
                            width={300}
                            height={300}
                        />
                    ) : (
                        <Image
                            src="/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"
                            alt="Photo"
                            width={300}
                            height={300}
                        />
                    )}
                </div>
                
                <p className="text-[#545F71]">{name}</p>
                <p className="text-[#545F71]">{role}</p>
                {blurb ? (
                    <p className="text-[#545F71]">
                        {displayBlurb}
                        {isBlurbLong && (
                            <button
                                onClick={() => setExpand(!expand)}
                                className="ml-1 text-blue-500 font-medium hover:underline">
                                {expand ? "Show less" : "More"}
                            </button>
                        )}
                    </p>
                ) : (
                    <p className="text-[#545F71]">No blurb available.</p>
                )}
            </div>
        </div>
    )
}