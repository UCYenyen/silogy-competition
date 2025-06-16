"use client";
export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  };

  return (
    <button onClick={handleLogout} className=" w-[60%] bg-red-500 text-lg rounded-xl h-fit text-white">
      Logout
    </button>
  );
}