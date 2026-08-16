import type { Metadata } from 'next'
import { getServerSession } from '@/actions/auth.actions'
import TeamMemberCard from '@/features/team/components/TeamMemberCard'

export const metadata: Metadata = {
  title: 'Team',
}

const teamMembers = [
  {
    name: 'Egor Zvyagin',
    role: 'Project Manager',
    blurb: 'Plans the work and helps the team stay on track.',
    image: '/boy.jpg',
  },
  {
    name: 'Muhammad Rayyan Sohail',
    role: 'Business Analyst',
    blurb: 'Understands project needs and turns them into clear requirements.',
    image: '/boy.jpg',
  },
  {
    name: 'Hui Wen Chew',
    role: 'User Experience Design',
    blurb: 'Designs simple and easy-to-use experiences for users.',
    image: '/girl.jpg',
  },
  {
    name: 'William Hok',
    role: 'Developer',
    blurb: 'Builds key features and keeps the code clear and reliable.',
    image: '/boy.jpg',
  },
  {
    name: 'Sahibjeet Singh',
    role: 'Developer',
    blurb: 'Tests and improves features to make sure they work well.',
    image: '/boy.jpg',
  },
]

export default async function TeamPage() {
  await getServerSession()

  return (
    <main className="mx-auto flex w-full max-w-[1160px] flex-col items-center gap-7 text-[#545f71] min-[1440px]:gap-8">
      <header className="flex w-full flex-col items-center gap-2">
        <h1 className="text-center text-[28px] font-bold text-[#343D4E] min-[1440px]:text-[32px]">
          Meet Our Team
        </h1>

        <p className="text-center text-xs font-normal text-[#606F7B] min-[1440px]:text-[13px]">
          Get to know the people behind our project
        </p>

        <h2 className="w-[280px] max-w-full text-center text-sm font-medium text-[#343D4E] min-[1440px]:text-[13px]">
          Team 28 - Grand Prix Redesigning Ticketing - Team 2
        </h2>
      </header>

      <section className="flex w-full justify-center">
        <div className="grid w-full grid-cols-1 justify-items-center gap-8 min-[1440px]:grid-cols-3 min-[1440px]:justify-items-stretch min-[1440px]:gap-x-6 min-[1440px]:gap-y-8 min-[1440px]:px-10">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              blurb={member.blurb}
              image={member.image}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
