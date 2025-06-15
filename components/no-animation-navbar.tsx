import Link from "next/link";
export default function noAnimationNavbar() {
  return (
    <nav 
      className="fixed z-[200] w-full p-6 md:p-8 px-16 flex items-center justify-between text-white text-lg md:text-xl font-bold transition-all duration-100 filter"
      style={{ backgroundColor: "rgba(60, 68, 87, 1)" }} // Set initial transparent background
    >
      <div className="flex items-center gap-4 shadow-xs">
        <Link href="/" className="font-heading text-4xl">TolongYuk!</Link>
      </div>
      <div className="hidden md:flex items-center gap-4 shadow-xs">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/semua-permintaan" className="hover:underline">Permintaan</Link>
        <div className="bg-[#FAFAFA] p-2 rounded-lg text-[#413939]">
          <Link href="/login" className="hover:underline px-4">Login</Link>
        </div>
      </div>
      {/* Mobile menu button */}
      <div className="flex flex-col gap-1.5 md:hidden shadow-xs">
        <div className="w-10 bg-white h-1.5"></div>
        <div className="w-10 bg-white h-1.5"></div>
      </div>
    </nav>
  );
}