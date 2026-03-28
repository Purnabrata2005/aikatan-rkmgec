import { Marquee } from "../magicui/marquee";
import { sponsorData } from "@/data/sponsor";
import Image from "next/image";
import Title from "../Title";

const SponsorCard: React.FC<{ img: string }> = ({ img }) => {
  return (
    <figure className="relative h-28 w-64 cursor-pointer overflow-hidden rounded-xl border border-accent/20 bg-secondary-bg/30 backdrop-blur-sm group hover:border-accent/60 transition-colors">
      <Image
        src={img}
        alt="Sponsor Logo"
        width={200}
        height={200}
        loading="lazy"
        className="object-contain w-full h-full max-w-full max-h-full p-4 grayscale group-hover:grayscale-0 transition-all duration-300"
      />
    </figure>
  );
};

const SponsorSection: React.FC = () => {
  const firstRow = sponsorData.slice(0, Math.ceil(sponsorData.length / 2));
  const secondRow = sponsorData.slice(Math.ceil(sponsorData.length / 2));

  return (
    // <div id="sponsors" className="relative flex w-full flex-col items-center justify-center overflow-hidden py-20">
    //     <Title title="Our Sponsors" className="from-highlight to-primary" />

    //     {/* First Marquee Row */}
    //     <Marquee pauseOnHover className="[--duration:20s]">
    //         {firstRow.map((sponsor, index) => (
    //             <SponsorCard key={index} img={sponsor.img} />
    //         ))}
    //     </Marquee>

    //     {/* Second Marquee Row (Reversed) */}
    //     <Marquee reverse pauseOnHover className="[--duration:20s]">
    //         {secondRow.map((sponsor, index) => (
    //             <SponsorCard key={index} img={sponsor.img} />
    //         ))}
    //     </Marquee>

    //     {/* Fading Gradient Effects */}
    //     <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black via-transparent"></div>
    //     <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black via-transparent"></div>
    // </div>
    <div
      id="schedule"
      className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12"
    >
      {/* Headline */}
      <div className="py-20 md:py-24">
        <Title title="Sponsorship" className="from-accent to-highlight mb-0" />
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-black/30 backdrop-blur-sm p-8 md:p-12 text-center">
        <p className="text-sm md:text-base uppercase tracking-[0.25em] text-amber-300/80 mb-3">
          Sponsorship Program
        </p>
        <h2 className="text-2xl md:text-4xl font-bold font-Orbitron text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">
          Coming Soon
        </h2>
        <p className="mt-4 text-foreground/80 max-w-2xl mx-auto">
          We are currently finalizing sponsorship details. Partnership tiers and
          benefits will be announced soon.
        </p>
      </div>
    </div>
  );
};

export default SponsorSection;
