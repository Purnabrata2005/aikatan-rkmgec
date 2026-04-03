import { Facebook, Github, Instagram, MapPin, Youtube } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full relative bg-background text-foreground py-16 md:py-20 border-t border-accent/10 font-inter overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_20px_var(--primary)]" />
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left: Logo & Description */}
                    <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                        <Link href="/" className="inline-block mb-8 group">
                            <div className="relative">
                                {/* Glow behind logo */}
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-colors duration-500" />
                                {/* <Image
                                    src={'/footer-img.png'}
                                    alt='Techlavya Logo'
                                    width={220}
                                    height={70}
                                    className='relative z-10 brightness-110 drop-shadow-[0_0_15px_rgba(213,206,163,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(213,206,163,0.5)] transition-all duration-500'
                                    priority
                                /> */}
                            </div>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6 font-outfit tracking-wide">
                            Celebrate the colors, rhythm, and expression of our vibrant cultural heritage. Join the grandest festival of the year.
                        </p>
                        <div className="inline-flex items-center gap-2 text-sm font-playfair tracking-widest text-accent/80 p-3 rounded-lg border border-fest-pink/10 bg-secondary-bg/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-fest-pink animate-pulse" />
                            FESTIVAL: <span className="text-fest-pink font-bold">LIVE</span>
                        </div>
                    </div>

                    {/* Middle: Links/Social */}
                    <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-highlight font-cinzel tracking-widest text-lg font-bold mb-8">CONNECT</h3>
                        <div className="flex flex-col space-y-4">
                            <Link href="mailto:culturalfest@rkmgec.ac.in" className="group flex items-center gap-3 text-muted-foreground hover:text-fest-pink transition-colors duration-300">
                                <span className="font-outfit text-xs tracking-widest uppercase">Email</span>
                                <span className="h-[1px] w-6 bg-accent/20 group-hover:w-12 group-hover:bg-fest-pink/60 transition-all duration-500" />
                            </Link>
                            <div className="flex gap-4 pt-4">
                                <SocialLink href="https://www.facebook.com/share/16AmVp6gyk/" Icon={Facebook} />
                                <SocialLink href="https://www.instagram.com/techlavya.rkmgec/" Icon={Instagram} />
                                <SocialLink href="https://www.youtube.com/@RKMGECOFFICIAL" Icon={Youtube} />
                                <SocialLink href="https://github.com/TechLavya" Icon={Github} />
                            </div>
                        </div>
                    </div>

                    {/* Right: Location */}
                    <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-highlight font-cinzel tracking-widest text-lg font-bold mb-8">VENUE</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
                            Ramkrishna Mahato Government Engineering College,<br />
                            Agharpur, Purulia 723203
                        </p>
                        <Link 
                            href="https://www.google.com/maps/place/Ram+Krishna+Mahato+Government+Engin…" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center justify-center gap-2 bg-secondary-bg/30 hover:bg-fest-pink/10 border border-accent/20 hover:border-fest-pink text-foreground hover:text-fest-pink px-6 py-3 rounded-xl transition-all duration-300 group shadow-lg shadow-black/20 font-inter text-xs tracking-widest uppercase"
                        >
                            <MapPin className="w-4 h-4 text-fest-pink group-hover:scale-110 transition-transform" />
                            Get Directions
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent my-12" />

                {/* Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-center md:text-left text-xs text-muted-foreground font-inter tracking-[0.2em] uppercase">
                        ©2026 AIKATAN. ALL RIGHTS RESERVED.
                    </p>
                    <p className="text-center md:text-right text-xs text-muted-foreground font-inter tracking-widest flex items-center gap-1.5 uppercase">
                        BUILT BY <span className="text-fest-saffron underline decoration-fest-saffron/30 underline-offset-4">TEAM AIKATAN</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

const SocialLink: React.FC<{ href: string; Icon: React.ElementType }> = ({ href, Icon }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-secondary-bg/40 border border-fest-pink/20 hover:bg-fest-pink/20 hover:border-fest-pink/50 hover:shadow-[0_0_15px_rgba(227,74,123,0.3)] transition-all duration-300 group">
        <Icon className="w-5 h-5 text-accent group-hover:text-fest-pink transition-colors duration-300" />
    </Link>
);