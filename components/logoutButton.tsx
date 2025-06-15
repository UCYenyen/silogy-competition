"use client";
export default function LogoutButton() {
  const functionLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <button onClick={functionLogout} className="p-4 bg-red-500 text-2xl rounded-2xl h-fit text-white">
      Logout
    </button>
  );
}