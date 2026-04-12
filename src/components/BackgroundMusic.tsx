"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay can be blocked until user interaction in some browsers.
      });
    }
  }, [isMuted]);

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      try {
        await audio.play();
      } catch {
        // If playback is blocked, keep UI responsive and let next interaction retry.
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music.m4a"
        autoPlay
        loop
        muted
        preload="auto"
      />

      <button
        type="button"
        onClick={toggleMute}
        aria-label={
          isMuted ? "Unmute background music" : "Mute background music"
        }
        className="fixed bottom-4 right-4 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-background/80 text-primary shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-background"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </>
  );
}
