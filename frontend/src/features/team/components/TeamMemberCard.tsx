import Image from "next/image"

type Props = {
    name: string,
    role: string,
    blurb: string,
    image: string | null
}

export default function TeamMemberCard( { name, role, blurb, image }: Props) {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="border-4 bg-gray-100 mb-4">
                {image ? (
                    <Image
                        src={image}
                        alt="Photo"
                        width={200}
                        height={200}
                    />
                ) : (
                    <Image
                        src="/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"
                        alt="Photo"
                        width={200}
                        height={200}
                    />
                )}
            </div>
            
            <p className="text-[#545F71]">{name}</p>
            <p className="text-[#545F71]">{role}</p>
            <p className="text-[#545F71]">{blurb}</p>
        </div>
    )
}