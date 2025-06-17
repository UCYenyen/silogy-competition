interface QuestYangDitawarCardProps {
  id: number;
  nama_permintaan: string;
  lokasi_permintaan: string;
  tingkat_kedaruratan: string;
  status_permintaan?: string;
  status_penerimaan?: string;
  upah: number;
}

export default function QuestCard({
  nama_permintaan,
  lokasi_permintaan,
  tingkat_kedaruratan,
status_permintaan,
  upah,
}: QuestYangDitawarCardProps) {
  return (
    <div className="flex flex-col bg-white shadow-xl p-4 md:p-6 border border-white rounded-2xl w-full min-h-[120px] md:min-h-[140px] gap-3 md:gap-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 w-full">
        <h1 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900 break-words flex-1 leading-tight">
          {nama_permintaan}
        </h1>
        <span className="inline-block text-xs md:text-sm px-2 py-1 font-bold text-red-500 bg-gray-200 rounded-lg whitespace-nowrap">
            {tingkat_kedaruratan}
          </span>
          <span className="inline-block text-xs md:text-sm px-2 py-1 font-bold text-black bg-gray-200 rounded-lg whitespace-nowrap">
            {status_permintaan}
          </span>
      </div>
      <p className="text-sm md:text-lg font-semibold text-gray-600 break-words leading-tight">{lokasi_permintaan}</p>
      <p className="text-sm md:text-lg font-bold text-green-600 mt-auto">
        Upah:{" "}
        <span className="text-xs md:text-base">
          Rp.{upah.toLocaleString("id-ID")}
        </span>
      </p>
    </div>
  );
}
