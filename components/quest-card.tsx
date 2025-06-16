interface QuestCardProps {
  id: number;
  nama_permintaan: string;
  lokasi_permintaan: string;
  tingkat_kedaruratan: string;
  upah: number;
}

export default function QuestCard({
  nama_permintaan,
  lokasi_permintaan,
  tingkat_kedaruratan,
  upah,
}: QuestCardProps) {
  return (
    <div className="flex items-center justify-between bg-white shadow-xl p-4 border-1 border-white rounded-2xl w-full min-h-[10rem]">
      <div className="flex flex-col gap-4 max-w-[60%]">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{nama_permintaan}</h1>
          <p className="text-md px-4 font-bold text-red-500 bg-gray-400/30 rounded-lg ">
          {tingkat_kedaruratan}
        </p>
        </div>
        <p className="text-xl font-semibold">{lokasi_permintaan}</p>
        <p className="text-xl font-bold text-green-600">Upah : Rp.{upah}</p>
      </div>
    </div>
  );
}
