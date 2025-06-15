"use client"

import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Footer(){
    useEffect(() => {
        gsap.utils.toArray<HTMLElement>(".footer-reveal").forEach((el, i) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.01,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 100%",
                        toggleActions: "play reverse play reverse", // re-reveal on scroll up
                    },
                }
            );
        });
    }, []);
    return(
        <div className="bg-[#93CBDC] px-12 md:px-24 w-full min-h-[25vh] flex justify-between items-center gap-4">
            <div className="flex flex-col gap-4 text-[#322C2C]">
                <h1 className="reveal font-heading text-4xl sm:text-6xl md:text-8xl font-semibold">TolongYuk!</h1>
                <h1 className="reveal text-xs sm:text-lg md:text-xl w-[80%] font-semibold">© 2025 TolongYuk by Rebet. All Rights Reserved.</h1>
            </div>
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-[#322C2C] footer-reveal font-bold text-xs sm:text-lg md:text-xl">Links</h1>
                    <div className="flex flex-col gap-4 text-xs sm:text-lg md:text-xl">
                        <Link className="footer-reveal" href="/">Home</Link>
                        <Link className="footer-reveal" href="/">Permintaan</Link>
                        <Link className="footer-reveal" href="/">Contact</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-[#322C2C] footer-reveal font-bold text-xs sm:text-lg md:text-xl">About Us</h1>
                    <div className="flex flex-col gap-4 text-xs sm:text-lg md:text-xl">
                        <Link className="footer-reveal" href="/">Instagram</Link>
                        <Link className="footer-reveal" href="/">Youtube</Link>
                        <Link className="footer-reveal" href="/">Twitter</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}