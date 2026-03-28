import { Calendar, Home, Images, PartyPopper, Sun, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SheetClose, SheetHeader, SheetTitle } from "./ui/sheet";

const MenuSections = [
     {
          title: null,
          items: [
               { icon: <Home size={18} />, text: "Home", navigateTo: "/#home" },
               { icon: <Calendar size={18} />, text: "Schedule", navigateTo: "/#schedule" },
          ],
     },
     {
          title: "Events",
          items: [
               { icon: <PartyPopper size={18} className="text-purple-400" />, text: "Techlavya", navigateTo: "/#techlavya" },
               { icon: <PartyPopper size={18} className="text-green-400" />, text: "Esports", navigateTo: "/#esports" },
          ],
     },
     {
          title: "More",
          items: [
               { icon: <Images size={18} />, text: "Gallery", navigateTo: "/#gallery" },
               { icon: <Sun size={18} className="text-yellow-500" />, text: "Sponsors", navigateTo: "/#sponsors" },
               { icon: <Users size={18} />, text: "Teams", navigateTo: "/teams" },
          ],
     },
];

const MobileMenubar: React.FC = () => {
     return (
          <>
               <SheetHeader className="mb-5">
                    <SheetTitle className="text-xl font-Orbitron font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-left px-4">
                         Menu
                    </SheetTitle>
               </SheetHeader>
               <div className="flex flex-col space-y-2">
                    {MenuSections.map((section, index) => (
                         <React.Fragment key={index}>
                              {section.title && (
                                   <div className="px-4 py-2 text-sm font-Orbitron font-semibold text-gray-400 border-b border-stone-700">
                                        {section.title}
                                   </div>
                              )}
                              {section.items.map((item, i) => (
                                   <MobileNavItem key={i} {...item} />
                              ))}
                         </React.Fragment>
                    ))}
               </div>
          </>
     );
};

export default MobileMenubar;

type MobileNavItemProps = {
     icon: React.ReactNode;
     text: string;
     navigateTo: string;
};

const MobileNavItem: React.FC<MobileNavItemProps> = ({ icon, text, navigateTo }) => (
     <SheetClose asChild>
          <Link
               href={navigateTo}
               className="flex items-center space-x-3 px-4 py-3 rounded-xl text-lg font-kodeMono tracking-wide font-medium transition-all duration-300 text-gray-300 hover:text-white hover:bg-stone-700/50"
          >
               {icon}
               <span>{text}</span>
          </Link>
     </SheetClose>
);
