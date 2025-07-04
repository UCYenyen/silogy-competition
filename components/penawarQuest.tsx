import supabase from "@/lib/db";
import { IUserPermintaan } from "@/types/users_permintaan.md";

interface penawarQuestProps {
  penerima_id: number;
  nama_penawar: string;
  deskripsi_penawar: string;
}

import { useEffect, useState } from "react";

export default function PenawarCard({
  penerima_id,
  nama_penawar,
  deskripsi_penawar,
}: penawarQuestProps) {
  const [userPermintaan, setUserPermintaan] = useState<IUserPermintaan>();

  useEffect(() => {
    const fetchUserPermintaan = async () => {
      const { data, error } = await supabase
        .from('users_permintaan')
        .select('*')
        .eq('calon_penerima_id', penerima_id)
        .single();
      if (!error) {
        setUserPermintaan(data);
      }
    };
    fetchUserPermintaan();
  }, [penerima_id]);

  const handleTerima = async () => {
      // Update status_penerimaan di table users_permintaan
      // Ambil permintaan_id dari users_permintaan
      if (!userPermintaan) return;
      const permintaan_id = userPermintaan.permintaan_id;

      // Update status_penerimaan di table users_permintaan
      const { error: error1 } = await supabase
        .from('users_permintaan')
        .update({ status_penerimaan: 'Diterima' })
        .eq('calon_penerima_id', penerima_id);

      // Update status_permintaan dan penerima_id di table permintaan
      const { error: error2 } = await supabase
        .from('permintaan')
        .update({ status_permintaan: 'Sedang Dikerjakan', penerima_id: penerima_id })
         .eq('id', permintaan_id); // tambahkan kondisi sesuai kebutuhan

      if (error1 || error2) throw error1 || error2;

      alert('Penawaran berhasil diterima');
      window.location.reload(); // Reload the page to reflect changes
  };

  const handleTolak = async () => {
    try {
      // Update status_penerimaan di table users_permintaan
      const { error: error1 } = await supabase
        .from('users_permintaan')
        .update({ status_penerimaan: 'Ditolak' })
        .eq('calon_penerima_id', penerima_id);

      if (error1 ) throw error1;

      alert('Penawaran berhasil ditolak');
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      alert('Terjadi kesalahan saat menolak, tolong cek koneksi internet anda. Error code : ' + error);
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-xl p-4 md:p-6 border border-white rounded-2xl w-full min-h-[120px] md:min-h-[140px] gap-3 md:gap-4">
      <div className="flexflex-col sm:flex-row sm:items-start sm:justify-between gap-2 w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900 break-words flex-1 leading-tight">
            {nama_penawar}
          </h1>
        </div>
      </div>
      <p className="text-sm md:text-lg font-semibold text-gray-600 break-words leading-tight">{deskripsi_penawar}</p>
      <div className="flex gap-2 mt-2">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          type="button"
          onClick={handleTerima}
        >
          Terima
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          type="button"
          onClick={() => handleTolak()}
        >
          Tolak
        </button>
      </div>
    </div>
  );
}
