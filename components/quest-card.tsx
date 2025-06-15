import Image from "next/image";

interface QuestCardProps {
  title: string;
  location: string;
  urgency: string;
  imageUrl?: string;
}

export default function QuestCard({
  title,
  location,
  urgency,
  imageUrl = "/images/gotong-royong-1.svg",
}: QuestCardProps) {
  return (
    <div className="reveal bg-[#F8FAFA] h-[250px] md:h-[500px] w-full shadow-md rounded-2xl flex flex-col gap-1">
      <div className="rounded-2xl overflow-hidden h-full md:h-[720px] w-full bg-[#93CBDC]/30 p-1 md:p-4">
        <Image
          className="w-full h-full object-cover object-center rounded-2xl"
          src={imageUrl}
          width={100}
          height={100}
          alt="Quest Image"
        />
      </div>
      <div className="flex flex-col items-start justify-between h-full md:gap-4 p-2 md:p-4">
        <div className="flex flex-col w-full gap-2">
          <h1 className="px-1 md:px-4 text-[#413939] font-bold text-md md:text-2xl text-start ">
            {title}
          </h1>
          <h1 className="px-1 md:px-4 text-[#939393] font-bold text-xs md:text-2xl text-start ">
            {location}
          </h1>
        </div>
        <h1 className="md:mt-8 px-1 md:px-4 text-[#0189BB] font-bold text-[80%] md:text-2xl text-start">
          {urgency}
        </h1>
      </div>
    </div>
  );
}