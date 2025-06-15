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

    let lastScrollY = window.scrollY;
    let accumulatedUp = 0;
    const threshold = 60; // px to trigger navbar show

    ScrollTrigger.create({
      start: "top -80",
      end: "max",
      onUpdate: (self) => {
        const currentScrollY = window.scrollY;
        const direction = self.direction;

        if (direction === -1) {
          // Scrolling up
          accumulatedUp += lastScrollY - currentScrollY;
          if (accumulatedUp > threshold && currentScrollY > threshold) {
            gsap.killTweensOf(navbar);
            gsap.to(navbar, {
              y: 0,
              duration: 0.5,
              ease: "expo.out"
            });
            accumulatedUp = 0; // reset after showing
          }
        } else {
          // Scrolling down
          accumulatedUp = 0;
          gsap.killTweensOf(navbar);
          gsap.to(navbar, {
            y: -100,
            duration: 0.5,
            ease: "expo.in"
          });
        }
        lastScrollY = currentScrollY;
      }
    });
    ScrollTrigger.create({
      trigger: ".mengapa-section",
      start: "center bottom",
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
      className="fixed z-[200] w-full p-6 md:p-12 px-16 flex items-center justify-between text-white text-lg md:text-xl font-bold transition-all duration-100 filter"
      style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} // Set initial transparent background
    >
      <div className="flex items-center gap-4 shadow-xs">
        <Link href="/" className="font-heading text-4xl">TolongYuk!</Link>
      </div>
      <div className="hidden md:flex items-center gap-4 hadow-xs">
        <Link href="/about" className="hover:underline">Home</Link>
        <Link href="/contact" className="hover:underline">Daftar Bantuan</Link>
        <div className="bg-[#FAFAFA] p-2 rounded-lg text-[#413939]">
          <Link href="/login" className="hover:underline px-4">Login</Link>
        </div>
      </div>
      {/* Mobile menu button */}
      <div className="flex flex-col gap-1.5 md:hidden hadow-xs">
        <div className="w-10 bg-white h-1.5"></div>
        <div className="w-10 bg-white h-1.5"></div>
      </div>
    </nav>
  );
}
