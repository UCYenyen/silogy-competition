import Image from "next/image";

import Navbar from "@/components/navbar";
export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="bg-[url('/images/background-home-desktop.svg')] bg-center bg-cover flex min-h-screen min-w-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="font-heading text-7xl font-bold sm:text-[200px] text-[#FFFFFF] w-screen text-center text-shadow-lg text-shadow-black/50">
            TolongYuk!
          </h1>
          <h1 className="text-3xl italic font-semibold sm:text-4xl text-[#FFFFFF] text-center w-[65%]">
            Membangun kota dengan menolong sesama!
          </h1>
        </div>
      </main>

      <section className="relative flex justify-center bg-[#D3E6EC]">
        <div className="z-10 absolute grid grid-cols-1 md:grid-cols-3 rounded-2xl justify-between items-center -top-[5%] md:-top-[15%] bg-[#F2F2F2] w-[70%] md:w-[80%] shadow-2xl gap-2">
          <div className="bg-[#F8FAFA] p-8 rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl rounded-tl-2xl w-full h-full flex flex-col justify-center items-center gap-2">
            <Image
              className="w-1/3 h-1/3 md:w-[100px] md:h-[100px]"
              src={"/images/icons/goal-icon.svg"}
              width={100}
              height={100}
              alt="Location Icon"
            />
            <h1 className="text-[#322C2C] text-center text-lg md:text-2xl font-semibold">
              Tujuan
            </h1>
            <h2 className="text-[#8C8C8C] text-md md:text-xl text-center w-[80%]">
              Menghidupkan Budaya Gotong Royong Lokal
            </h2>
          </div>
          <div className="bg-[#F8FAFA] p-8 w-full h-full flex flex-col justify-center items-center gap-2">
            <Image
              className="w-1/3 h-1/3 md:w-[100px] md:h-[100px]"
              src={"/images/icons/waktu-operasional.svg"}
              width={100}
              height={100}
              alt="Location Icon"
            />
            <h1 className="text-[#322C2C] text-center text-lg md:text-2xl font-semibold">
              Waktu
            </h1>
            <h1 className="text-[#322C2C] text-center text-lg md:text-2xl font-semibold">
              Operasional
            </h1>
            <h2 className="text-[#8C8C8C] text-md md:text-xl text-center w-[80%]">
              24 Jam
            </h2>
          </div>
          <div className="bg-[#F8FAFA] p-8 rounded-bl-2xl md:rounded-bl-none rounded-br-2xl md:rounded-tr-2xl w-full h-full flex flex-col justify-center items-center gap-2">
            <Image
              className="w-1/3 h-1/3 md:w-[100px] md:h-[100px]"
              src={"/images/icons/location-icon.svg"}
              width={100}
              height={100}
              alt="Location Icon"
            />
            <h1 className="text-[#322C2C] text-center text-lg md:text-2xl font-semibold">
              Area Pelayanan
            </h1>
            <h2 className="text-[#8C8C8C] text-md md:text-xl text-center w-[40%]">
              Seluruh Wilayah Surabaya
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center">
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

          <div className="relative z-20 w-screen h-screen flex justify-between">
            <div className="hidden md:flex w-full h-screen">
              <Image
                className="absolute top-[25%] left-0 w-1/2"
                src={"/images/gotong-royong-3.svg"}
                width={100}
                height={100}
                alt="Location Icon"
              />
            </div>
            <div className="w-full h-screen flex items-center">
              <div className="md:mt-48 flex flex-col gap-12 w-full h-full justify-center items-center md:items-start">
                <div className="w-50 h-1 bg-gradient-to-l from-black to-transparent"></div>
                <h1 className="z-30 text-5xl text-[#484848] text-center md:text-start font-bold">
                  Mengapa TolongYuk?
                </h1>
                <p className="text-center md:text-start text-2xl w-[80%] md:w-[60%]">
                  TolongYuk! adalah platform gotong royong digital yang
                  menghubungkan kebutuhan masyarakat dengan aksi nyata dari para
                  relawan dan pekerja lokal.
                </p>
                <p className="text-center md:text-start text-2xl w-[80%] md:w-[60%]">
                  Bersama kita ciptakan kota yang lebih bersih, inklusif, dan
                  berkelanjutan, sekaligus membuka peluang kerja layak bagi
                  semua!
                </p>

                <div className="p-4 bg-white rounded-lg shadow-lg">
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

      <section className="min-h-screen gap-8 flex p-12 md:pt-48 md:px-24 flex-col items-center md:items-start md:justify-start bg-[#EDEDED] ">
        <div className="w-50 z-[150] h-1 bg-gradient-to-l from-[#0189BB] to-transparent"></div>
        <h1 className="text-[#322C2C] font-bold text-5xl text-center ">
          Semua Suara
        </h1>
        <div className="flex flex-col gap-8 p-12 rounded-lg shadow-lg justify-start items-center bg-[#CDEBF3] min-h-[20rem] w-full">
          <h1 className="text-[#322C2C] font-bold text-5xl text-center">
            Cari Suara
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
          {/* First item */}
          <div className="bg-[#F8FAFA] h-[500px] w-full shadow-lg rounded-2xl flex flex-col gap-4">
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
          {/* First item */}
          <div className="bg-[#F8FAFA] h-[500px] w-full shadow-lg rounded-2xl flex flex-col gap-4">
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
          {/* First item */}
          <div className="bg-[#F8FAFA] h-[500px] w-full shadow-lg rounded-2xl flex flex-col gap-4">
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
          {/* First item */}
          <div className="bg-[#F8FAFA] h-[500px] w-full shadow-lg rounded-2xl flex flex-col gap-4">
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
          {/* First item */}
          <div className="bg-[#F8FAFA] h-[500px] w-full shadow-lg rounded-2xl flex flex-col gap-4">
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
          {/* First item */}
          <div className="bg-[#F8FAFA] h-[500px] w-full shadow-lg rounded-2xl flex flex-col gap-4">
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
        </div>
      </section>
    </div>
  );
}
