"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navbar = navRef.current;
    if (!navbar) return;
    gsap.set(navbar, { y: 0 });

    ScrollTrigger.create({
      start: "top -80",
      end: "max",
      onUpdate: (self) => {
        // Get scroll direction
        const direction = self.direction;
        
        if (direction === -1) {
          gsap.killTweensOf(navbar);
          gsap.to(navbar, {
            y: 0,
            duration: 0,
            ease: "power2.out"
          });
        } else {
          gsap.killTweensOf(navbar);
          gsap.to(navbar, {
            y: -1000,
            duration: 0,
            ease: "power2.out"
          });
        }
      }
    });
    ScrollTrigger.create({
      trigger: ".mengapa-section",
      start: "top bottom",
      end: "bottom top",
      
      onEnter: () => {
        gsap.killTweensOf(navbar);
        gsap.to(navbar, {
          backgroundColor: "rgba(60, 68, 87, 1)",
          duration: 0,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf(navbar);
        gsap.to(navbar, {
          backgroundColor: "rgba(0, 0, 0, 0)",
          duration: 0,
          ease: "power2.out"
        });
      }
    });

    ScrollTrigger.create({
      start: "top top",
      end: "80px",
      onEnter: () => {
        gsap.killTweensOf(navbar);
        gsap.to(navbar, {
          y: 0,
          duration: 0,
          ease: "linear"
        });
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed z-50 w-full p-12 px-16 flex items-center justify-between text-white text-lg md:text-xl font-bold transition-all duration-100"
      style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} // Set initial transparent background
    >
      <div className="flex items-center gap-4">
        <Link href="/" className="">Logo</Link>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Link href="/about" className="hover:underline">Home</Link>
        <Link href="/contact" className="hover:underline">Forum</Link>
        <Link href="/contact" className="hover:underline">Statistics</Link>
        <div className="bg-[#FAFAFA] p-2 rounded-lg text-[#413939]">
          <Link href="/login" className="hover:underline">Account</Link>
        </div>
      </div>
      {/* Mobile menu button */}
      <div className="flex flex-col gap-1.5 md:hidden">
        <div className="w-10 bg-white h-1.5"></div>
        <div className="w-10 bg-white h-1.5"></div>
      </div>
    </nav>
  );
}
