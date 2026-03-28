import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import React from 'react';

type TeamCardProps = {
     name: string;
     role: string;
     image: string;
     instagram?: string;
     twitter?: string;
     facebook?: string;
     linkedin?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, role, image, instagram, twitter, facebook, linkedin }) => {
     return (
          <div className="group relative border border-accent/10 hover:border-accent/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_35px_rgba(213,206,163,0.15)] rounded-2xl p-6 text-center transition-all duration-500 overflow-hidden bg-background">

               {/* Profile Image */}
               <div className="relative w-32 h-32 mx-auto mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-full border border-primary/40 group-hover:border-primary group-hover:rotate-180 transition-all duration-1000 border-dashed" />
                    <div className="absolute inset-[4px] overflow-hidden rounded-full border border-accent/20 z-10">
                         <Image
                              src={image}
                              alt={name}
                              width={150}
                              height={150}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              priority={true}
                         />
                    </div>
               </div>

               <div className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-500">
                    <h2 className="text-xl md:text-2xl font-bold font-orbitron text-highlight tracking-widest mb-1">{name}</h2>
                    <p className="text-primary text-xs font-kodeMono tracking-[0.2em] uppercase mb-6">{role}</p>
               </div>

               {/* Social Links */}
               <div className="flex justify-center gap-4 relative z-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {instagram && <SocialIcon href={instagram} Icon={Instagram} />}
                    {twitter && <SocialIcon href={twitter} Icon={Twitter} />}
                    {facebook && <SocialIcon href={facebook} Icon={Facebook} />}
                    {linkedin && <SocialIcon href={linkedin} Icon={Linkedin} />}
               </div>
          </div>
     );
};

export default TeamCard;

const SocialIcon: React.FC<{ href: string; Icon: React.ElementType; color: string }> = ({ href, Icon }) => (
     <Link href={href} target="_blank" rel="noopener noreferrer" className="group/icon p-2 rounded-full border border-accent/10 hover:border-primary/50 transition-all duration-300">
          <Icon className="w-4 h-4 text-muted-foreground group-hover/icon:text-primary transition-colors duration-300" style={{ color: 'currentColor' }} />
     </Link>
);