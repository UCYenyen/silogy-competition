import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-12 text-white text-xl font-bold">
        <div className="flex items-center gap-4">
            <Link href="/" className="">Home</Link>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/about" className="hover:underline">Home</Link>
            <Link href="/contact" className="hover:underline">Forum</Link>
            <Link href="/contact" className="hover:underline">Statistics</Link>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/login" className="hover:underline">Account</Link>
        </div>
    </nav>
  );
}
