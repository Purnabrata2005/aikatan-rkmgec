"use client";

import { Zap, ShieldCheck, Box, ChevronRight } from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const TshirtSection = () => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const [enableTilt, setEnableTilt] = useState(false)

    // Slight 3D rotation based on mouse position
    const rotateX = useTransform(y, [-100, 100], [10, -10])
    const rotateY = useTransform(x, [-100, 100], [-10, 10])

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const coarsePointer = window.matchMedia('(pointer: coarse)').matches
        setEnableTilt(!reducedMotion && !coarsePointer)
    }, [])

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!enableTilt) return
        const rect = event.currentTarget.getBoundingClientRect()
        // Determine mouse pos relative to center
        x.set(event.clientX - rect.left - rect.width / 2)
        y.set(event.clientY - rect.top - rect.height / 2)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <section className="relative py-16 md:py-24 overflow-hidden font-sans">

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
                {/* HEADER */}
                <div className="mb-10 md:mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-3 md:space-y-4"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cinzel text-foreground tracking-wider">
                            Aikatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-fest-gold to-fest-saffron">Collection</span>
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground font-outfit tracking-widest uppercase">
                            Official Merchandise
                        </p>
                        <div className="flex justify-center">
                            <div className="h-1 w-16 bg-gradient-to-r from-accent to-primary rounded-full" />
                        </div>
                    </motion.div>
                </div>

                {/* CARD */}
                <div className="flex flex-col lg:flex-row rounded-xl md:rounded-[2rem] lg:rounded-[3rem] border border-accent/20 overflow-hidden bg-secondary-bg/40 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]">

                    {/* LEFT: The "Spec" Sidebar (Vertical Info) */}
                    <div className="w-full lg:w-1/4 bg-background/50 border-b lg:border-b-0 lg:border-r border-accent/10 p-6 md:p-8 flex flex-col justify-between order-2 lg:order-1">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(184,92,56,0.2)]"
                            >
                                <Box className="text-primary w-6 h-6" />
                            </motion.div>
                            <div>
                                <h4 className="text-accent/80 font-inter tracking-[0.2em] text-[10px] uppercase mb-2">Item Class</h4>
                                <p className="text-foreground font-outfit text-lg font-bold tracking-widest">Festival Wear</p>
                            </div>
                            <div className="space-y-4">
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 text-muted-foreground text-sm font-spaceGrotesk tracking-wide"
                                >
                                    <ShieldCheck className="w-5 h-5 text-accent" /> Custom Fit
                                </motion.div>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 text-muted-foreground text-sm font-spaceGrotesk tracking-wide"
                                >
                                    <Zap className="w-5 h-5 text-primary" /> Signature Edition
                                </motion.div>
                            </div>
                        </div>

                        <div className="mt-12 lg:mt-0">
                            <span className="text-4xl lg:text-5xl font-bold font-outfit text-accent/10 select-none tracking-widest">2026</span>
                        </div>
                    </div>

                    {/* CENTER: The Visual Hero */}
                    <div
                        className="w-full lg:w-1/2 relative group p-6 md:p-8 lg:p-12 flex items-center justify-center bg-gradient-to-b from-primary/5 to-transparent min-h-[300px] md:min-h-[400px] order-1 lg:order-2"
                        onMouseMove={enableTilt ? handleMouseMove : undefined}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <motion.div
                            style={{ rotateX: enableTilt ? rotateX : 0, rotateY: enableTilt ? rotateY : 0, transformStyle: "preserve-3d" }}
                            className="relative w-full h-full flex items-center justify-center"
                        >
                            {/* Floating Geometric Ornaments */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/50 [transform:translateZ(20px)]" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent/50 [transform:translateZ(20px)]" />

                            {/* Glow Behind */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary/20 rounded-full blur-[60px] -z-10 group-hover:bg-primary/30 transition-colors duration-500" />

                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10 rounded-2xl border border-accent/25 bg-black/40 backdrop-blur-sm px-8 py-10 md:px-12 md:py-14 text-center shadow-[0_0_40px_rgba(213,206,163,0.12)]"
                                style={{ transform: "translateZ(50px)" }}
                            >
                                <p className="text-[10px] md:text-xs font-inter tracking-[0.3em] uppercase text-accent/70 mb-3">
                                    Festival T-Shirt
                                </p>
                                <h3 className="text-3xl md:text-5xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-fest-gold to-fest-saffron tracking-wider">
                                    Coming Soon
                                </h3>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT: Action & Pricing */}
                    <div className="w-full lg:w-1/4 p-6 md:p-8 lg:p-10 bg-background/50 border-t lg:border-t-0 lg:border-l border-accent/10 flex flex-col justify-center order-3">
                        <h2 className="text-muted-foreground font-inter text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-2">FESTIVAL / 2026</h2>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-4 md:mb-6 font-cinzel tracking-wider">
                            The <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-fest-gold to-fest-saffron">Aesthetic</span>
                        </h3>

                        <p className="text-muted-foreground text-xs md:text-sm font-inter leading-relaxed mb-6 md:mb-8">
                            Premium cotton blend with traditional motif prints. Embrace the festive vibe with our official apparel.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-baseline gap-2 md:gap-3">
                                <span className="text-2xl md:text-3xl font-bold text-highlight font-spaceGrotesk tracking-widest">₹---</span>
                                <span className="text-accent/40 line-through text-[10px] md:text-xs font-kodeMono">TBA</span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full h-12 md:h-14 bg-fest-pink/10 hover:bg-fest-pink/20 border border-fest-pink text-fest-pink font-outfit font-bold text-[10px] md:text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(227,74,123,0.15)] hover:shadow-[0_0_25px_rgba(227,74,123,0.3)] backdrop-blur-sm"
                            >
                                Pre-order Now
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default TshirtSection