import React from "react";
import Image from "next/image";
import Title from "../Title";
import { sponsorData } from "@/data/sponsor";

const SponsorSection: React.FC = () => {
  const featuredPartners = sponsorData.filter(
    (partner) =>
      partner.role === "Title Sponsor" || partner.role === "Hospitality Partner",
  );
  const supportingPartners = sponsorData.filter(
    (partner) =>
      partner.role !== "Title Sponsor" && partner.role !== "Hospitality Partner",
  );

  return (
    <section
      id="sponsors"
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* --- Epic Header --- */}
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-fest-gold/30 bg-fest-gold/5 px-4 py-1.5 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fest-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fest-gold"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-fest-gold">
              The Lineup
            </span>
          </div>
          <Title
            title="Visionary Partners"
            className="from-fest-gold via-white to-fest-saffron mb-6 text-5xl md:text-6xl"
          />
          <p className="max-w-2xl text-balance text-base md:text-lg text-foreground/75 leading-relaxed">
            An ecosystem of industry titans and creative powerhouses. Discover
            the forces powering this year&apos;s experience.
          </p>
        </div>

        <div className="space-y-12">
          {/* --- Tier 1: Featured Partners (Gradient Border Cards) --- */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {featuredPartners.map((partner) => (
              <div
                key={`${partner.role}-${partner.name}`}
                className="group relative rounded-[2rem] bg-card/50 p-[1px] transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(255,215,0,0.2)]"
              >
                {/* Animated Gradient Border Layer */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-fest-gold/30 opacity-50 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-fest-gold/50 group-hover:to-fest-saffron/50" />

                {/* Inner Card Content */}
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[calc(2rem-1px)] bg-card/85 p-8 backdrop-blur-xl sm:p-10">
                  {/* Decorative Background Glow inside card */}
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fest-gold/5 blur-[80px] transition-all duration-500 group-hover:bg-fest-gold/10" />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-8">
                    <div className="space-y-4">
                      <span className="inline-flex items-center rounded-full border border-fest-gold/30 bg-fest-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-fest-gold shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                        {partner.role}
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-cinzel transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-fest-gold">
                        {partner.name}
                      </h3>
                    </div>

                    {partner.logo && (
                      <div className="relative flex h-28 w-36 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-background/40 p-5 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:border-fest-gold/30 group-hover:shadow-[0_10px_30px_-10px_rgba(255,215,0,0.2)]">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    )}
                  </div>

                  <p className="relative z-10 mt-8 max-w-lg text-sm sm:text-base leading-relaxed text-foreground/75 transition-colors group-hover:text-foreground/90">
                    {partner.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --- Divider --- */}
          <div className="flex items-center justify-center gap-4 opacity-40">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-fest-gold" />
            <div className="h-1.5 w-1.5 rotate-45 bg-fest-gold" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-fest-gold" />
          </div>

          {/* --- Tier 2: Supporting Partners (Sleek Minimalist Grid) --- */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {supportingPartners.map((partner) => (
              <div
                key={`${partner.role}-${partner.name}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card/45 p-6 ring-1 ring-border/60 backdrop-blur-sm transition-all duration-300 hover:bg-card/65 hover:ring-fest-gold/30"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/55 transition-colors group-hover:text-fest-gold/80">
                      {partner.role}
                    </p>
                    <h4 className="text-lg font-semibold text-foreground/90 font-cinzel transition-colors group-hover:text-foreground">
                      {partner.name}
                    </h4>
                  </div>
                  {partner.logo && (
                    <div className="relative h-10 w-10 shrink-0 transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-foreground/60 line-clamp-2 transition-colors group-hover:text-foreground/75">
                  {partner.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;
