import Navbar from "@/components/no-animation-navbar"
import Footer from "@/components/footer";
import Link from "next/link";

export default function LebihLanjutPage() {
  return (
    <div className="min-h-screen bg-[#EDEDED]">
      <Navbar />
      
      <div className="pt-32 px-4 md:px-24 pb-16">
        <div className="max-w-4xl mx-auto bg-[#CDEBF3] rounded-lg shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <Link href="/" className="font-heading text-[60px] md:text-[80px] font-bold text-[#163760]">
              TolongYuk!
            </Link>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="leading-relaxed">
              TolongYuk! adalah platform gotong royong digital yang menghubungkan 
              kebutuhan masyarakat dengan aksi nyata dari para relawan dan pekerja lokal.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#163760] mt-8 mb-4">
              Misi Kami
            </h2>
            <p>
              Menghidupkan kembali budaya gotong royong dalam kehidupan modern 
              melalui teknologi yang mudah diakses oleh semua kalangan.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#163760] mt-8 mb-4">
              Visi Kami
            </h2>
            <p>
              Menciptakan masyarakat yang saling membantu dan peduli, dimana 
              setiap orang dapat berkontribusi untuk kemajuan bersama.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#163760] mt-8 mb-4">
              Cara Kerja
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Buat permintaan bantuan sesuai kebutuhan Anda</li>
              <li>Tentukan lokasi dan tingkat kedaruratan</li>
              <li>Tetapkan upah yang sesuai untuk pekerjaan</li>
              <li>Tunggu respons dari para helper yang siap membantu</li>
              <li>Pilih helper terbaik dan selesaikan pekerjaan bersama</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-[#163760] mt-8 mb-4">
              Keunggulan Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-[#F0F9FF] p-6 rounded-lg">
                <h3 className="font-semibold text-[#163760] mb-2">24/7 Tersedia</h3>
                <p>Platform dapat diakses kapan saja, dimana saja</p>
              </div>
              <div className="bg-[#F0F9FF] p-6 rounded-lg">
                <h3 className="font-semibold text-[#163760] mb-2">Area Luas</h3>
                <p>Melayani seluruh wilayah Surabaya</p>
              </div>
              <div className="bg-[#F0F9FF] p-6 rounded-lg">
                <h3 className="font-semibold text-[#163760] mb-2">Mudah Digunakan</h3>
                <p>Interface yang intuitif untuk semua kalangan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}