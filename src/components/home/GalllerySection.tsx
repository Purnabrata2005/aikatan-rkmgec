import React from "react";
import Container from "../Container";
import Image from "next/image";
import { galleryImages } from "@/data/gallery";

const GallerySection: React.FC = () => {
     return (
          <Container id="gallery" title="Gallery" titleClassName="from-accent to-primary">
               {/* Using a dynamic grid: 
          - span-2 rows and columns create a "Bento Box" feel 
          - aspect-square keeps things consistent but varied
      */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[220px] mb-16 px-4 md:px-0">
                    {galleryImages.map((img, index) => {
                         // Creative Logic: Make every 3rd or 6th item larger for visual rhythm
                         const isLarge = index === 0 || index === 6;
                         const isTall = index === 2 || index === 5;

                         return (
                              <div
                                   key={index}
                                   className={`group relative overflow-hidden rounded-[24px] bg-secondary-bg/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-700 hover:shadow-[0_15px_40px_rgba(213,206,163,0.15)] hover:-translate-y-2 border border-accent/10 hover:border-accent/40 hover:z-10 ${isLarge ? "md:col-span-2 md:row-span-2" : ""} ${isTall ? "md:row-span-2" : ""}`}
                              >
                                   {/* Decorative Tech Corners */}
                                   <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/0 group-hover:border-primary/50 transition-colors duration-500 z-20 pointer-events-none rounded-tl-[24px]" />
                                   <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-highlight/0 group-hover:border-highlight/50 transition-colors duration-500 z-20 pointer-events-none rounded-br-[24px]" />

                                   {/* Image Component */}
                                   <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill // Use fill for better responsive control in varied boxes
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:rotate-1 opacity-80 group-hover:opacity-100"
                                        priority={index < 4}
                                   />

                                   {/* Glassmorphic Overlay */}
                                   <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/60 to-transparent p-6 pt-12 opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end translate-y-4 group-hover:translate-y-0">
                                        <p className="text-highlight font-spaceGrotesk text-sm font-medium tracking-widest uppercase relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                             {img.alt || "View Archive"}
                                        </p>
                                        <div className="h-[2px] w-12 bg-gradient-to-r from-accent to-primary mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-[0_0_10px_var(--accent)]" />
                                   </div>

                                   {/* Scanner Line Effect */}
                                   <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/40 shadow-[0_0_15px_var(--primary)] -translate-y-[100%] group-hover:animate-[scan_2s_ease-in-out_infinite] z-30 pointer-events-none opacity-0 group-hover:opacity-100" />
                              </div>
                         );
                    })}
               </div>
               <style dangerouslySetInnerHTML={{__html: `
                   @keyframes scan {
                       0% { top: 0%; opacity: 0; }
                       10% { opacity: 1; }
                       90% { opacity: 1; }
                       100% { top: 100%; opacity: 0; }
                   }
               `}} />
          </Container>
     );
};

export default GallerySection;