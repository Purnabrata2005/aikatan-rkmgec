"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import SplashCursor from "@/components/SplashCursor";



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
      {/* Lightweight Minimal Festive Background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-slate-950">
        <div className="absolute top-0 -left-1/4 w-3/4 h-1/2 bg-purple-900/30 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 -right-1/4 w-3/4 h-1/2 bg-amber-700/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-rose-900/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/20" />

      {loading ? (
        <Loader finishLoading={() => setLoading(false)} />
      ) : (
        <div className="relative z-10">
          <SplashCursor />
          <Navbar />
          {children}
          <Footer />
        </div>
      )}
    </div>
  );
}
