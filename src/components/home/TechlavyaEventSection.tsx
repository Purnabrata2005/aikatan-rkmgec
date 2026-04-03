"use client";

import React from "react";
import Container from "../Container";

const AikatanEventSection: React.FC = () => {
  return (
    <Container id="events" title="Aikatan Events" titleClassName="from-accent to-highlight">
      <div className="mb-10 rounded-2xl border border-accent/20 bg-secondary-bg/30 backdrop-blur-xl p-8 sm:p-12 text-center">
        <p className="text-sm sm:text-base font-kodeMono uppercase tracking-[0.35em] text-accent/80 mb-4">
          Event updates
        </p>
        <h3 className="text-3xl sm:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary tracking-wider">
          Coming Soon
        </h3>
        <p className="mt-4 text-muted-foreground font-spaceGrotesk">
          Aikatan cultural fest event details will be announced soon.
        </p>
      </div>
    </Container>
  );
};

export default AikatanEventSection;
