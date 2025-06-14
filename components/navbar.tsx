import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed z-100 min-w-screen flex items-center justify-between p-12 text-white text-xl font-bold">
        <div className="flex items-center gap-4">
            <Link href="/" className="">Logo</Link>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/about" className="hover:underline">Home</Link>
            <Link href="/contact" className="hover:underline">Forum</Link>
            <Link href="/contact" className="hover:underline">Statistics</Link>
            <div className="bg-[#93CBDC] p-2 rounded-lg text-[#413939]">
              <Link href="/login" className="hover:underline">Account</Link>
            </div>
        </div>
    </nav>
  );
}
