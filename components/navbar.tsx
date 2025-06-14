import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed z-50 w-full p-12 px-16 flex items-center justify-between text-white text-lg md:text-xl font-bold">
        <div className="flex items-center gap-4">
            <Link href="/" className="">Logo</Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
            <Link href="/about" className="hover:underline">Home</Link>
            <Link href="/contact" className="hover:underline">Forum</Link>
            <Link href="/contact" className="hover:underline">Statistics</Link>
            <div className="bg-[#FAFAFA] p-2 rounded-lg text-[#413939]">
              <Link href="/login" className="hover:underline">Account</Link>
            </div>
        </div>
        {/* Mobile menu button - you can expand this to a hamburger menu */}
        <div className="flex flex-col gap-1.5 md:hidden">
          <div className="w-10 bg-white h-1.5"></div>
          <div className="w-10 bg-white h-1.5"></div>
          <div className="w-10 bg-white h-1.5"></div>
        </div>
    </nav>
  );
}
