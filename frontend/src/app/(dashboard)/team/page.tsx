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
    <main className="mx-auto flex w-full max-w-[1160px] flex-col gap-7 text-[#606f7b] min-[1440px]:gap-8">
      <header className="flex flex-col items-center gap-2 text-center min-[1440px]:gap-1.5">
        <h1 className="text-[28px] leading-[normal] font-bold text-[#343d4e] min-[1440px]:text-[32px]">
          Meet Our Team
        </h1>
        <p className="text-sm leading-[normal]">Get to know the people behind our project</p>
        <h2
          id="team-title"
          className="w-[280px] text-sm leading-[1.3] font-bold text-[#343d4e] min-[1440px]:w-auto min-[1440px]:text-[13px] min-[1440px]:leading-[normal]"
        >
          Team 28 - Grand Prix Redesigning Ticketing - Team 2
        </h2>
      </header>

      <section aria-labelledby="team-title">
        <div className="grid w-full grid-cols-1 justify-items-center gap-8 min-[1440px]:grid-cols-3 min-[1440px]:justify-items-stretch min-[1440px]:gap-x-6 min-[1440px]:gap-y-8 min-[1440px]:px-10 sm:grid-cols-2">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </section>
    </main>
  )
}
