"use client";
import Image from "next/image";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type UserData = {
  id: string;
  name: string;
  email: string;
};

export default function Dashboard() {
    const navRef = useRef<HTMLElement>(null);
    const [user, setUser] = useState<object | null>(null);
    
    const cards = Array(6).fill({
        title: "Bersih-bersih",
        location: "gang banana",
        price: "Rp.90,000,00",
        image: "/images/gotong-royong-1.svg", 
    });
    const supabase = createClientComponentClient();
    
      useEffect(() => {
        async function getUser() {
          const {
            data: { session },
          } = await supabase.auth.getSession();
    
          if (session) {
            const {
              data: { user },
            } = await supabase.auth.getUser();
            setUser({
              id: user?.id ?? "",
              name: user?.user_metadata?.name || "User",
              email: user?.email ?? "",
            });
          }
        }
    
        getUser();
      }, [supabase]);

    // Navbar animation logic - ONLY hide/show, NO color changes
    useEffect(() => {
        const navbar = navRef.current;
        if (!navbar) return;
        
        // Set initial navbar with visible background - FIXED COLOR
        gsap.set(navbar, { 
            y: 0,
            backgroundColor: "rgba(60, 68, 87, 0.9)" // Always this color
        });

        let lastScrollY = window.scrollY;
        let accumulatedUp = 0;
        const threshold = 60; // px to trigger navbar show

        // ONLY ScrollTrigger for hide/show behavior
        ScrollTrigger.create({
            start: "top -80",
            end: "max",
            onUpdate: (self) => {
                const currentScrollY = window.scrollY;
                const direction = self.direction;

                if (direction === -1) {
                    // Scrolling up - SHOW navbar
                    accumulatedUp += lastScrollY - currentScrollY;
                    if (accumulatedUp > threshold && currentScrollY > threshold) {
                        gsap.killTweensOf(navbar);
                        gsap.to(navbar, {
                            y: 0,
                            duration: 0.5,
                            ease: "expo.out"
                        });
                        accumulatedUp = 0;
                    }
                } else {
                    // Scrolling down - HIDE navbar
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

        // Keep navbar visible at the very top
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
        <div className="bg-[#EDEDED] min-h-screen">
            {/* Integrated Navbar - FIXED COLOR */}
            <nav 
                ref={navRef}
                className="fixed z-[200] w-full p-6 md:p-8 px-16 flex items-center justify-between text-white text-lg md:text-xl font-bold transition-all duration-100 filter"
                style={{ backgroundColor: "rgba(60, 68, 87, 0.9)" }} // ALWAYS this color
            >
                <div className="flex items-center gap-4 shadow-xs">
                    <Link href="/" className="font-heading text-4xl">TolongYuk!</Link>
                </div>
                <div className="hidden md:flex items-center gap-4 shadow-xs">
                    <Link href="/semua-permintaan" className="hover:underline">Permintaan</Link>
                    {user ? (
                        <>
                            <Link
                                href="/user-dashboard"
                                className="flex items-center justify-center px-2 py-1 rounded-full hover:bg-gray-200 transition min-w-10 min-h-10"
                            >
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300">
                                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                                        <circle cx="12" cy="8" r="4" fill="#163760" />
                                        <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#163760" />
                                    </svg>
                                </span>
                            </Link>
                        </>
                    ) : (
                        <div className="bg-[#FAFAFA] p-2 rounded-lg text-[#413939]">
                            <Link href="/login" className="hover:underline px-4">Login</Link>
                        </div>
                    )}
                </div>
                {/* Mobile menu button */}
                <div className="flex flex-col gap-1.5 md:hidden hadow-xs">
                    <div className="w-10 bg-white h-1.5"></div>
                    <div className="w-10 bg-white h-1.5"></div>
                </div>
            </nav>

            {/* Rest of your content stays exactly the same */}
            <section className="min-h-screen gap-8 flex p-12 md:pt-48 md:px-24 flex-col items-center md:items-start md:justify-start bg-[#EDEDED] ">
                <div className="w-50 z-[150] h-1 bg-gradient-to-l from-[#0189BB] to-transparent"></div>
                <h1 className="text-[#322C2C] font-bold text-5xl text-center ">
                    Semua Permintaan
                </h1>
                <div className="flex flex-col gap-8 p-12 rounded-lg shadow-lg justify-start items-center bg-[#CDEBF3] min-h-[20rem] w-full">
                    <h1 className="text-[#322C2C] font-bold text-5xl text-center">
                        Cari Permintaan
                    </h1>
                    <div className="flex flex-col w-full items-center gap-8">
                        <div className="flex flex-col w-full items-center gap-4">
                            <div className="relative w-full flex justify-center">
                                <input
                                    type="text"
                                    placeholder="Cari"
                                    className="w-full rounded-full py-5 px-8 text-2xl font-semibold text-[#5A5A5A] bg-white shadow focus:outline-none"
                                />
                                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl text-[#5A5A5A]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <circle cx="11" cy="11" r="7" strokeWidth="2" />
                                        <path
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            d="M20 20l-3.5-3.5"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div className="flex flex-col md:flex-row w-full gap-2 mt-4 bg-[#F8FAFA]">
                                <button className="flex-1 bg-white p-4 font-bold text-lg flex items-center justify-between gap-2 shadow">
                                    Tipe kebutuhan <span className="text-base">▼</span>
                                </button>
                                <button className="flex-1 bg-white p-4 font-bold text-lg flex items-center justify-between gap-2 shadow">
                                    Lokasi <span className="text-base">▼</span>
                                </button>
                                <button className="flex-1 bg-white p-4 font-bold text-lg flex items-center justify-between gap-2 shadow">
                                    Tingkat Kedaruratan <span className="text-base">▼</span>
                                </button>
                                <button className="flex-1 bg-white p-4 font-bold text-lg flex items-center justify-between gap-2 shadow">
                                    Upah <span className="text-base">▼</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Your existing grid items */}
                    {Array(6).fill(0).map((_, index) => (
                        <div key={index} className="bg-[#F8FAFA] h-[500px] w-full shadow-lg rounded-2xl flex flex-col gap-4">
                            <div className="rounded-2xl overflow-hidden h-[720px] w-full bg-[#93CBDC]/30 p-4">
                                <Image
                                    className="w-full h-full object-cover rounded-2xl"
                                    src={"/images/gotong-royong-1.svg"}
                                    width={100}
                                    height={100}
                                    alt="Location Icon"
                                />
                            </div>
                            <div className="flex flex-col justify-between h-full gap-4 p-4">
                                <div className="flex flex-col gap-2">
                                    <h1 className="px-4 text-[#413939] font-bold text-2xl text-start ">
                                        Bersih Bersih
                                    </h1>
                                    <h1 className="px-4 text-[#939393] font-bold text-2xl text-start ">
                                        gang banana
                                    </h1>
                                </div>
                                <h1 className="mt-8 px-4 text-[#0189BB] font-bold text-2xl text-start">
                                    Rp.90,000,00
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
