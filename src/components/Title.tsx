'use client'

import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

type Props = {
     title: string;
     className?: string;
}

const Title: React.FC<Props> = ({ title, className }) => {
     return (
          <motion.h1
               initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
               whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
               transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.21, 0.47, 0.32, 0.98]
               }}
               viewport={{ once: true }}
               className={cn(
                    'relative z-10 text-[28px] xs:text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter uppercase text-center mb-10 md:mb-16',
                    // Using Orbitron for that tech/sci-fi feel
                    'font-Orbitron',
                    // Brownish/Copper Gradient
                    'text-transparent bg-clip-text bg-gradient-to-b from-[#D2B48C] via-[#8B4513] to-[#4b2c20]',
                    // Industrial Text Shadow for depth
                    'drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]',
                    className
               )}
          >
               {/* Subtle "Glow" behind the text to make the brown pop against dark backgrounds */}
               <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-amber-900/20 to-transparent blur-2xl opacity-50" />

               {title}

               {/* Underline Decorative Element */}
               <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100px' }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="h-[2px] bg-[#8B4513] mx-auto mt-2 opacity-60 shadow-[0_0_8px_#8B4513]"
               />
          </motion.h1>
     )
}

export default Title