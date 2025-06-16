import Image from "next/image";

interface QuestCardProps {
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
      <h1 className="text-2xl font-bold">{nama_permintaan}</h1>
      <p className="text-xl font-semibold">{lokasi_permintaan}</p>
      <p className="text-xl font-bold text-green-600">Upah : Rp.{upah}</p>
      <p className="text-md font-semibold text-red-500">{tingkat_kedaruratan}</p>
      </div>
      <button className="p-5 px-4 w-fit h-fit bg-blue-500 rounded-2xl text-white font-bold">Tolong</button>
    </div>
    // <div className="reveal bg-[#F8FAFA] h-[250px] md:h-[500px] w-full shadow-md rounded-2xl flex flex-col gap-1">
    //   <div className="rounded-2xl overflow-hidden h-full md:h-[720px] w-full bg-[#93CBDC]/30 p-1 md:p-4">
    //     <Image
    //       className="w-full h-full object-cover object-center rounded-2xl"
    //       src={imageUrl}
    //       width={100}
    //       height={100}
    //       alt="Quest Image"
    //     />
    //   </div>
    //   <div className="flex flex-col items-start justify-between h-full md:gap-4 p-2 md:p-4">
    //     <div className="flex flex-col w-full gap-2">
    //       <h1 className="px-1 md:px-4 text-[#413939] font-bold text-md md:text-2xl text-start ">
    //         {title}
    //       </h1>
    //       <h1 className="px-1 md:px-4 text-[#939393] font-bold text-xs md:text-2xl text-start ">
    //         {location}
    //       </h1>
    //     </div>
    //     <h1 className="md:mt-8 px-1 md:px-4 text-[#0189BB] font-bold text-[80%] md:text-2xl text-start">
    //       {urgency}
    //     </h1>
    //   </div>
    // </div>
  );
}