import { useEffect } from "react";
import { gsap } from "gsap";

interface LoadingOverlayProps {
  isVisible: boolean;
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  useEffect(() => {
    if (isVisible) {
      gsap.to(".loading-overlay", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(".loading-overlay", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        pointerEvents: "none",
      });
    }
  }, [isVisible]);

  return (
    <div className="loading-overlay fixed inset-0 bg-[#FAFAFA] bg-opacity-50 z-[200] flex items-center justify-center opacity-0 pointer-events-none">
      <div className="loading-spinner w-16 h-16 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
}