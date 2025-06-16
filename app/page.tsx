"use client";
import "./globals.css"; // Ensure you have a global CSS file for styles
import Image from "next/image";

import Navbar from "@/components/navbar";
import QuestSection from "@/components/quest-section";
import Footer from "@/components/footer";
import { useEffect } from "react";
import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LoadingOverlay from "@/components/loading-overlay";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasikan proses loading
    const timer = setTimeout(() => {
      setIsLoading(false); // Sembunyikan overlay setelah halaman selesai dimuat
    }, 2000); // Ganti dengan durasi loading yang sesuai

    return () => clearTimeout(timer); // Bersihkan timer saat komponen di-unmount
  }, []);

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el, i) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.01,
          ease: "power4.out",
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
    <div>
      <Navbar />
      <LoadingOverlay isVisible={isLoading} />
      <main className="main-section bg-[url('/images/background-home-no-noise.svg')] bg-center bg-cover flex min-h-screen min-w-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="reveal font-heading text-7xl font-bold sm:text-[150px] md:text-[200px] text-[#FFFFFF] w-screen text-center text-shadow-lg text-shadow-black/50">
            TolongYuk!
          </h1>
          <h1 className="reveal text-3xl italic font-semibold sm:text-4xl text-[#FFFFFF] text-center w-[65%]">
            Membangun kota dengan menolong sesama!
          </h1>
        </div>
      </main>

      <section className="relative flex justify-center bg-[#D3E6EC] pb-4">
        <div className="reveal z-10 absolute grid grid-cols-1 md:grid-cols-3 rounded-2xl justify-between items-center -top-[5%] md:-top-[15%] bg-[#F2F2F2] w-[70%] md:w-[80%] shadow-2xl gap-2">
          <div className="bg-[#F8FAFA] p-8 rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl rounded-tl-2xl w-full h-full flex flex-col justify-center items-center gap-2">
            <Image
              className="w-1/3 h-1/3 md:w-[100px] reveal md:h-[100px]"
              src={"/images/icons/goal-icon.svg"}
              width={100}
              height={100}
              alt="Location Icon"
            />
            <h1 className="text-[#322C2C] reveal text-center text-lg md:text-2xl font-semibold">
              Tujuan
            </h1>
            <h2 className="text-[#8C8C8C] reveal text-md md:text-xl text-center w-[80%]">
              Menghidupkan Budaya Gotong Royong Lokal
            </h2>
          </div>
          <div className="bg-[#F8FAFA] p-8 w-full h-full flex flex-col justify-center items-center gap-2">
            <Image
              className="w-1/3 h-1/3  reveal md:w-[100px] md:h-[100px]"
              src={"/images/icons/waktu-operasional.svg"}
              width={100}
              height={100}
              alt="Location Icon"
            />
            <h1 className="text-[#322C2C] reveal text-center text-lg md:text-2xl font-semibold">
              Waktu
            </h1>
            <h1 className="text-[#322C2C] reveal text-center text-lg md:text-2xl font-semibold">
              Operasional
            </h1>
            <h2 className="text-[#8C8C8C] reveal text-md md:text-xl text-center w-[80%]">
              24 Jam
            </h2>
          </div>
          <div className="bg-[#F8FAFA] p-8 rounded-bl-2xl md:rounded-bl-none rounded-br-2xl md:rounded-tr-2xl w-full h-full flex flex-col justify-center items-center gap-2">
            <Image
              className="w-1/3 h-1/3 reveal md:w-[100px] md:h-[100px]"
              src={"/images/icons/location-icon.svg"}
              width={100}
              height={100}
              alt="Location Icon"
            />
            <h1 className="text-[#322C2C] reveal text-center text-lg md:text-2xl font-semibold">
              Area Pelayanan
            </h1>
            <h2 className="text-[#8C8C8C] reveal text-md md:text-xl text-center w-[40%]">
              Seluruh Wilayah Surabaya
            </h2>
          </div>
        </div>

        <div className="mengapa-section flex flex-col items-center">
          <div className="z-10 h-1/6 hidden sm:grid md:hidden lg:hidden xl:hidden grid-cols-1 md:grid-cols-3 rounded-2xl justify-between items-center w-[70%] md:w-[80%] gap-2">
            <div className="p-8 rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl rounded-tl-2xl w-full h-full flex flex-col justify-center items-center gap-2">
              <Image
                className="opacity-0 w-1/3 h-1/3 md:w-[100px] reveal md:h-[100px]"
                src={"/images/icons/goal-icon.svg"}
                width={100}
                height={100}
                alt="Location Icon"
              />
              <h1 className="text-transparent reveal text-center text-lg md:text-2xl font-semibold">
                Tujuan
              </h1>
              <h2 className="text-transparent reveal text-md md:text-xl text-center w-[80%]">
                Menghidupkan Budaya Gotong Royong Lokal
              </h2>
            </div>
            <div className="p-8 w-full h-full flex flex-col justify-center items-center gap-2">
              <Image
                className="opacity-0 w-1/3 h-1/3 md:w-[100px] md:h-[100px]"
                src={"/images/icons/waktu-operasional.svg"}
                width={100}
                height={100}
                alt="Location Icon"
              />
              <h1 className="text-transparent reveal text-center text-lg md:text-2xl font-semibold">
                Waktu
              </h1>
              <h1 className="text-transparent reveal text-center text-lg md:text-2xl font-semibold">
                Operasional
              </h1>
              <h2 className="text-transparent reveal text-md md:text-xl text-center w-[80%]">
                24 Jam
              </h2>
            </div>
            <div className="p-8 rounded-bl-2xl md:rounded-bl-none rounded-br-2xl md:rounded-tr-2xl w-full h-full flex flex-col justify-center items-center gap-2">
              <Image
                className="opacity-0 w-1/3 h-1/3 md:w-[100px] md:h-[100px]"
                src={"/images/icons/location-icon.svg"}
                width={100}
                height={100}
                alt="Location Icon"
              />
              <h1 className="text-transparent reveal text-center text-lg md:text-2xl font-semibold">
                Area Pelayanan
              </h1>
              <h2 className="text-transparent reveal text-md md:text-xl text-center w-[40%]">
                Seluruh Wilayah Surabaya
              </h2>
            </div>
          </div>

          <div className="z-10 md:hidden grid grid-cols-1 md:grid-cols-3 rounded-2xl justify-between items-center w-[70%] md:w-[80%] gap-2">
            <div className="p-8 rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl rounded-tl-2xl w-full h-full flex flex-col justify-center items-center gap-2">
              <Image
                className="opacity-0 w-1/3 h-1/3 md:w-[100px] md:h-[100px]"
                src={"/images/icons/goal-icon.svg"}
                width={100}
                height={100}
                alt="Location Icon"
              />
              <h1 className="text-transparent text-center text-lg md:text-2xl font-semibold">
                Tujuan
              </h1>
              <h2 className="text-transparent text-md md:text-xl text-center w-[80%]">
                Menghidupkan Budaya Gotong Royong Lokal
              </h2>
            </div>
            <div className="p-8 w-full h-full flex flex-col justify-center items-center gap-2">
              <Image
                className="opacity-0 w-1/3 h-1/3 md:w-[100px] md:h-[100px]"
                src={"/images/icons/waktu-operasional.svg"}
                width={100}
                height={100}
                alt="Location Icon"
              />
              <h1 className="text-transparent text-center text-lg md:text-2xl font-semibold">
                Waktu
              </h1>
              <h1 className="text-transparent text-center text-lg md:text-2xl font-semibold">
                Operasional
              </h1>
              <h2 className="text-transparent text-md md:text-xl text-center w-[80%]">
                24 Jam
              </h2>
            </div>
            <div className="p-8 rounded-bl-2xl md:rounded-bl-none rounded-br-2xl md:rounded-tr-2xl w-full h-full flex flex-col justify-center items-center gap-2">
              <Image
                className="opacity-0 w-1/3 h-1/3 md:w-[100px] md:h-[100px]"
                src={"/images/icons/location-icon.svg"}
                width={100}
                height={100}
                alt="Location Icon"
              />
              <h1 className="text-transparent text-center text-lg md:text-2xl font-semibold">
                Area Pelayanan
              </h1>
              <h2 className="text-transparent text-md md:text-xl text-center w-[40%]">
                Seluruh Wilayah Surabaya
              </h2>
            </div>
          </div>

          <div className="lg:mt-12 relative z-20 w-screen h-screen flex justify-between">
            <div className="hidden xl:flex w-full h-screen">
              <Image
                className="absolute top-[25%] left-0 w-1/2"
                src={"/images/gotong-royong-3.svg"}
                width={100}
                height={100}
                alt="Location Icon"
              />
            </div>
            <div className="w-full h-screen flex items-center">
              <div className="md:mt-48 flex reveal flex-col gap-12 w-full h-full justify-center items-center xl:items-start">
                <div className="w-50 h-1 bg-gradient-to-l from-black to-transparent"></div>
                <h1 className="z-30 text-5xl reveal text-[#484848] text-center xl:text-start font-bold">
                  Mengapa TolongYuk?
                </h1>
                <p className="text-center reveal xl:text-start text-2xl w-[80%] xl:w-[60%]">
                  TolongYuk! adalah platform gotong royong digital yang
                  menghubungkan kebutuhan masyarakat dengan aksi nyata dari para
                  relawan dan pekerja lokal.
                </p>
                <p className="text-center reveal xl:text-start text-2xl w-[80%] xl:w-[60%]">
                  Bersama kita ciptakan kota yang lebih bersih, inklusif, dan
                  berkelanjutan, sekaligus membuka peluang kerja layak bagi
                  semua!
                </p>

                <div className="p-4 bg-white rounded-lg reveal shadow-lg">
                  <p className="font-semibold text-2xl flex items-center gap-4">
                    Lebih Lanjut
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <QuestSection />
      <Footer />
    </div>
  );
}

//INI CUMA BUAT COPAS AKU KE PAGE.TSX E, ini buat nunjuin all user and staff mbe login register page