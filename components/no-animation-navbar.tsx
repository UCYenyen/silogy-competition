'use client'
import Link from "next/link";
import { IUser } from "@/types/user.md";
import LogoutButton from "./logoutButton";
import { useEffect, useState } from "react";
export default function noAnimationNavbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);
  
    useEffect(() => {
      const user = localStorage.getItem("loggedInUser");
      if (user) {
        setLoggedInUser(JSON.parse(user));
      }
    }, []);
    
      const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };
  return (
    <nav
      className="fixed z-[200] w-full p-6 md:p-8 px-16 flex items-center justify-between text-white text-lg md:text-xl font-bold transition-all duration-100 filter"
      style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} // Set initial transparent background
    >
      <div className="flex items-center gap-4 shadow-xs">
        <Link href="/" className="font-heading text-4xl">
          TolongYuk!
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-4 shadow-xs">
        {loggedInUser ? (
          <div className="relative">
            <div
              className="flex items-center justify-center px-2 py-1 rounded-full hover:bg-gray-200 transition min-w-10 min-h-10 cursor-pointer"
              onClick={toggleDropdown}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" fill="#163760" />
                  <path
                    d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                    fill="#163760"
                  />
                </svg>
              </span>
            </div>
            {dropdownVisible && (
              <div
                className="absolute flex flex-col items-center justify-start right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                tabIndex={0}
                onBlur={() => setDropdownVisible(false)}
              >
                <p className="px-4 text-black">
                  Halo, {loggedInUser?.username || "Pengguna"}
                </p>
                <hr className="my-2" />
                <Link
                  href="/user-dashboard"
                  className="px-4 text-black text-center hover:bg-gray-100 w-full"
                >
                  Dashboard
                </Link>
                <hr className="my-2" />
                <LogoutButton />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#FAFAFA] p-2 rounded-lg text-[#413939]">
            <Link href="/login" className="hover:underline px-4">
              Login
            </Link>
          </div>
        )}
      </div>
      {/* Mobile menu button */}
      <div className="flex flex-col gap-1.5 md:hidden shadow-xs">
        <div className="w-10 bg-white h-1.5"></div>
        <div className="w-10 bg-white h-1.5"></div>
      </div>
    </nav>
  );
}