'use client'

import React from "react";
import { Gamepad2, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface EventItemProps {
     title: string;
     type: string;
     isActive: boolean;
}

export const EventItem: React.FC<EventItemProps> = ({ title, type, isActive }) => {
     return (
          <li className="flex gap-3 items-center group/item cursor-pointer">
               <motion.div
                    className="p-2 rounded-lg backdrop-blur-md text-indigo-400"
                    aria-label={`Event type: ${type}`}
                    initial={false}
                    animate={{
                         backgroundColor: isActive ? "rgba(99,102,241,0.5)" : "rgba(41,37,36,0.7)",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
               >
                    {getIconForEvent(type)}
               </motion.div>

               <motion.p
                    className="text-indigo-200 text-sm sm:text-lg font-kodeMono tracking-wide"
                    initial={false}
                    animate={{
                         x: isActive ? 8 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
               >
                    {title}
               </motion.p>
          </li>
     );
};

const getIconForEvent = (type: string) => {
     return {
          tech: <Zap size={18} className="h-4 w-4 text-red-400" />,
          esports: <Gamepad2 size={18} className="h-4 w-4 text-purple-400" />,
       }[type] || <Sparkles size={18} className="h-4 w-4 text-yellow-400" />;
};
