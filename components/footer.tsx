import Image from "next/image";
import Link from "next/link";
export default function Footer(){
    return(
        <div className="bg-[#93CBDC] px-12 md:px-24 w-full min-h-[25vh] flex justify-between items-center gap-4">
            <div className="flex flex-col gap-4 text-[#322C2C]">
                <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl font-semibold">TolongYuk!</h1>
                <h1 className="text-xs sm:text-lg md:text-xl w-[80%] font-semibold">© 2025 TolongYuk by Rebet. All Rights Reserved.</h1>
            </div>
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-[#322C2C] font-bold text-xs sm:text-lg md:text-xl">Links</h1>
                    <div className="flex flex-col gap-4 text-xs sm:text-lg md:text-xl">
                        <Link href="/">Home</Link>
                        <Link href="/">Permintaan</Link>
                        <Link href="/">Contact</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-[#322C2C] font-bold text-xs sm:text-lg md:text-xl">About Us</h1>
                    <div className="flex flex-col gap-4 text-xs sm:text-lg md:text-xl">
                        <Link href="/">Instagram</Link>
                        <Link href="/">Youtube</Link>
                        <Link href="/">Twitter</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}