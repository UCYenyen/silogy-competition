interface penawarQuestProps {
  nama_penawar: string;
  deskripsi_penawar: string;
}

export default function PenawarCard({
  nama_penawar,
deskripsi_penawar,
}: penawarQuestProps) {
  return (
    <div className="flex flex-col bg-white shadow-xl p-4 md:p-6 border border-white rounded-2xl w-full min-h-[120px] md:min-h-[140px] gap-3 md:gap-4">
      <div className="flexflex-col sm:flex-row sm:items-start sm:justify-between gap-2 w-full">
        <div className="flex flex-col gap-1">
        <h1 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900 break-words flex-1 leading-tight">
          Tawaran bantuan dari :
        </h1>
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
          onClick={() => alert('Penawaran diterima')}
        >
          Terima
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          type="button"
          onClick={() => alert('Penawaran ditolak')}
        >
          Tolak
        </button>
      </div>
    </div>
  );
}
