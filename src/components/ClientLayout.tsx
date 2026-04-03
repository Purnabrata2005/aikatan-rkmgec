"use client";

import { useEffect, useState } from "react";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import SplashCursor from "@/components/SplashCursor";
import BackgroundMusic from "@/components/BackgroundMusic";
import Galaxy from "@/components/Galaxy";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const checkPerformanceProfile = () => {
      const nav = navigator as Navigator & { deviceMemory?: number };
      const lowCpu = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
      const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
      const reducedMotion = mediaQuery.matches;
      setLowPerformanceMode(lowCpu || lowMemory || reducedMotion);
    };

    checkPerformanceProfile();
    mediaQuery.addEventListener("change", checkPerformanceProfile);

    return () => {
      mediaQuery.removeEventListener("change", checkPerformanceProfile);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-20">
        <Galaxy
          mouseRepulsion={!lowPerformanceMode}
          mouseInteraction={!lowPerformanceMode}
          density={lowPerformanceMode ? 0.8 : 1.5}
          glowIntensity={lowPerformanceMode ? 0.15 : 0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={lowPerformanceMode ? 0.15 : 0.5}
          rotationSpeed={lowPerformanceMode ? 0.03 : 0.1}
          repulsionStrength={lowPerformanceMode ? 0.8 : 2}
          autoCenterRepulsion={0}
          starSpeed={lowPerformanceMode ? 0.25 : 0.5}
          speed={lowPerformanceMode ? 0.8 : 1.5}
          renderScale={lowPerformanceMode ? 0.65 : 1}
          maxFPS={lowPerformanceMode ? 24 : 60}
        />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/45" />

      {loading ? (
        <Loader finishLoading={() => setLoading(false)} />
      ) : (
        <div className="relative z-10">
          <SplashCursor />
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
          {!lowPerformanceMode && <BackgroundMusic />}
        </div>
      )}
    </div>
  );
}
