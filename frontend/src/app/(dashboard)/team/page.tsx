import type { Metadata } from 'next'
import { getServerSession } from '@/actions/auth.actions'
import TeamMemberCard from '@/features/team/components/TeamMemberCard'

export const metadata: Metadata = {
  title: 'Team',
}

const teamMembers = [
    {
        name: "Egor Zvyagin",
        role: "Project Manager",
        blurb: "Leads the team and making sure the project are delivered",
        image: "/boy.jpg"
    },
    {
        name: "Muhammad Rayyan Sohail",
        role: "Business Analyst",
        blurb: "Turn client's need into requirements, validates designs and builds match what was agreed",
        image: "/boy.jpg"
    },
    {
        name: "Hui Wen Chew",
        role: "User Experience Design",
        blurb: "Designs intuitive and consistent layouts and turn BA's requrements into a mockup",
        image: "/girl.jpg"
    },
    {
        name: "William Hok",
        role: "Developer",
        blurb: "Build features and fix bugs",
        image: null
    },
    {
        name: "Sahibjeet Singh",
        role: "Developer",
        blurb: "Tests every flow and edge cases and keeps build reliable",
        image: "/boy.jpg"
    }
]

export default async function TeamPage() {
  const session = await getServerSession()

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-[48px] text-[#545F71] font-bold tracking-tight">Meet Our Team</h1>
        <p className="mt-1 text-sm text-zinc-500">Get to know the people behind our project</p>
      </div>

      <div className='flex flex-col items-center justify-between'>
        <h2 className="text-[32px] text-[#545F71] font-bold tracking-tight pr-8 pb-8 pl-8">Team 28 - Grand Prix Redesign Ticketing - Team 2</h2>
        <div className='flex flex-wrap gap-x-50 items-center justify-center'>
            {teamMembers.map(member => (
                <TeamMemberCard key={member.name} {...member}/>
            ))}
        </div>
      </div>
    </div>
  )
}
