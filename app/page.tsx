'use client';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import gsap from "gsap";

export default function Home() {
  const starsRef = useRef<HTMLDivElement>(null);
  const earthWrapperRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<
    { top: number; left: number; size: number }[]
  >([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 5 + Math.random() * 5,
    }));
    setStars(generatedStars);
  }, []);

  // Subtle floating animation for stars
  useEffect(() => {
    if (!starsRef.current) return;
    const stars = gsap.utils.toArray<HTMLElement>(".star-parallax");
    stars.forEach((star, i) => {
      gsap.to(star, {
        x: `+=${gsap.utils.random(-10, 10)}`,
        y: `+=${gsap.utils.random(-10, 10)}`,
        duration: gsap.utils.random(2, 4),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 2),
      });
    });
  }, [stars]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      gsap.utils.toArray<HTMLElement>(".star-parallax").forEach((star, i) => {
        const depth = (i % 10) + 1;
        gsap.to(star, {
          x: `+=${x * depth * 5}`,
          y: `+=${y * depth * 5}`,
          duration: 1,
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Earth rotation animation
  useEffect(() => {
    if (earthWrapperRef.current) {
      gsap.to(earthWrapperRef.current, {
        rotate: 360,
        duration: 180,
        repeat: -1,
        ease: "linear",
      });
    }
  }, []);

  return (
    <>
      <main className="flex min-h-screen w-full flex-col bg-gradient-to-b from-[#0B1741] to-[#014576] relative overflow-hidden">
        {/* Random stars background */}
        <div ref={starsRef} className="pointer-events-none absolute inset-0 w-full h-full z-[5]">
          {stars.map((star, i) => (
            <Image
              key={i}
              src="/images/star.svg"
              alt="Star"
              width={star.size}
              height={star.size}
              className="star-parallax absolute"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            />
          ))}
        </div>
        <div
          id="container"
          className="flex flex-1 flex-col max-h-screen overflow-hidden justify-start items-center"
        >
          <div className="relative flex-1 w-full h-full flex justify-center items-center">
            <div ref={earthWrapperRef} className="w-30%] z-10">
              <Image
                src="/images/Earth.svg"
                alt="Earth"
                width={100}
                height={100}
                className="w-full h-auto"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
