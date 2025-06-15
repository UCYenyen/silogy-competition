import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function QuestCard(){
    useEffect(() => {
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el, i) => {
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
                        start: "top 85%",
                        toggleActions: "play reverse play reverse", // re-reveal on scroll up
                    },
                }
            );
        });
    }, []);

    return (
        <div className="reveal bg-[#F8FAFA] h-[250px] md:h-[500px] w-full shadow-md rounded-2xl flex flex-col gap-1">
            <div className="rounded-2xl overflow-hidden h-full md:h-[720px] w-full bg-[#93CBDC]/30 p-1 md:p-4">
                <Image
                    className="reveal w-full h-full object-cover object-center rounded-2xl"
                    src={"/images/gotong-royong-1.svg"}
                    width={100}
                    height={100}
                    alt="Location Icon"
                />
            </div>
            <div className="flex flex-col items-start justify-between h-full md:gap-4 p-2 md:p-4">
                <div className="flex flex-col w-full gap-2">
                    <h1 className="reveal px-1 md:px-4 text-[#413939] font-bold text-md md:text-2xl text-start ">
                        Bersih Bersih
                    </h1>
                    <h1 className="reveal px-1 md:px-4 text-[#939393] font-bold text-xs md:text-2xl text-start ">
                        Jalan Gajah Mada No.30, Ponorogo
                    </h1>
                </div>
                <h1 className="reveal md:mt-8 px-1 md:px-4 text-[#0189BB] font-bold text-[80%] md:text-2xl text-start">
                    Rp.90,000
                </h1>
            </div>
        </div>
    );
}