"use client";
import Image from "next/image";

export default function TolongYukSection() {
  return (
    <section className="min-h-screen w-full bg-[#F5F5F5] py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/community-service.jpg" // You'll need to add this image
                alt="Community service - building houses"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* Blue accent line */}
            <div className="w-16 h-1 bg-blue-500"></div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
              Mengapa TolongYuk?
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-lg">
                TolongYuk! adalah platform gotong royong digital yang menghubungkan kebutuhan masyarakat dengan aksi nyata dari para relawan dan pekerja lokal.
              </p>
              
              <p className="text-lg">
                Bersama kita ciptakan kota yang lebih bersih, inklusif, dan berkelanjutan, sekaligus membuka peluang kerja layak bagi semua!
              </p>
            </div>

            <button className="bg-blue-400 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors duration-300 flex items-center gap-2">
              Lebih Lanjut
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}