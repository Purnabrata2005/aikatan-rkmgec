import Title from "../Title";

const SponsorSection: React.FC = () => {
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
        <Title title="Partners & Sponsors" className="from-fest-gold to-fest-saffron mb-0" />
      </div>

      <div className="rounded-3xl border border-fest-gold/30 bg-black/40 backdrop-blur-md p-8 md:p-12 text-center shadow-lg">
        <p className="text-sm md:text-base uppercase tracking-[0.25em] text-fest-gold/80 mb-3 font-outfit">
          Sponsorship Program
        </p>
        <h2 className="text-2xl md:text-4xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-fest-gold to-fest-saffron">
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
