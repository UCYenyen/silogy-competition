"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Dashboard() {
    const router = useRouter();

    const cards = Array(6).fill({
        title: "Bersih-bersih",
        location: "gang banana",
        price: "Rp.90,000,00",
        image: "/images/gotong-royong-1.svg", 
    });

    const handleQuestClick = (questIndex: number) => {
        router.push(`./permintaan-data`); //ini nanti bisa diganti sama primary key quest nya
    };

    return (
        <div className="bg-[#EDEDED] min-h-screen">
            <Navbar />
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-48">
                    {cards.map((card, index) => (
                        <div
                            key={index} //ini nanti biar bisa mbuka detail quest yang id e 
                            onClick={() => handleQuestClick(index)}
                            className="bg-[#F8FAFA] h-[500px] w-full shadow-lg rounded-2xl flex flex-col gap-4 hover:scale-105 transition-transform cursor-pointer"
                        >
                            <div className="rounded-2xl overflow-hidden h-[720px] w-full bg-[#93CBDC]/30 p-4">
                                <Image
                                    className="w-full h-full object-cover rounded-2xl"
                                    src={card.image}
                                    width={100}
                                    height={100}
                                    alt="Quest Image"
                                />
                            </div>
                            <div className="flex flex-col justify-between h-full gap-4 p-4">
                                <div className="flex flex-col gap-2">
                                    <h1 className="px-4 text-[#413939] font-bold text-2xl text-start ">
                                        {card.title}
                                    </h1>
                                    <h1 className="px-4 text-[#939393] font-bold text-2xl text-start ">
                                        {card.location}
                                    </h1>
                                </div>
                                <h1 className="mt-8 px-4 text-[#0189BB] font-bold text-2xl text-start">
                                    {card.price}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
