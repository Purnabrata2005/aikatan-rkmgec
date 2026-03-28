import TeamCard from '@/components/TeamCard'
import { TeamMember, teamMembers } from '@/data/team-data'
import { v4 as uuidv4 } from 'uuid'
import React from 'react'

const Teams: React.FC = () => {
     return (
          <div className="min-h-screen text-foreground py-12 px-8 md:px-16 lg:px-20 pt-32">
               {/* <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary mb-12 font-orbitron tracking-widest">
                    HEAD TEAM MEMBERS
               </h1> */}

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
                    {teamMembers.map((member: TeamMember) => (
                         <TeamCard {...member} key={uuidv4()} />
                    ))}
               </div>
          </div>
     )
}

export default Teams