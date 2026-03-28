"use client";

import { useEffect, useState } from "react";

interface MobileWelcomeScreenProps {
  onDismiss?: () => void;
}

export default function MobileWelcomeScreen({ onDismiss }: MobileWelcomeScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're on client side
    setIsClient(true);

    // Check if device is mobile
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      return mobileRegex.test(userAgent);
    };

    const mobile = checkIfMobile();
    setIsMobile(mobile);

    if (mobile) {
      console.log("Mobile device detected - showing splash screen for 3 seconds");
      // Show splash screen for minimum 3 seconds on mobile
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Desktop - hide immediately
      setIsVisible(false);
      onDismiss?.();
    }
  }, [onDismiss]);

  // Don't render anything on server side
  if (!isClient) {
    return null;
  }

  // Don't render if not visible or not mobile
  if (!isVisible || !isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/98 backdrop-blur-lg" style={{ zIndex: 99999 }}>
      <div className="flex flex-col items-center justify-center text-center px-6 animate-fade-in">
        {/* Icon/Emoji */}
        <div className="mb-6">
          <div className="text-6xl mb-4">💻</div>
        </div>

        {/* Main Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
          Best Experience on Desktop
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-md font-sora">
          Open this website on your PC or desktop for the best experience
        </p>

        {/* Closing message */}
        <p className="text-sm text-gray-400 animate-pulse font-inter">
          Loading website...
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
