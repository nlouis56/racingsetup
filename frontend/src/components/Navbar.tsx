import { useState, useEffect } from "react";
import Link from "next/link";
import router from "next/router";

export default function Navbar() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  }, []);

  const handleOnline = () => {
    setIsOnline(true);
    alert("You are now connected to the internet. Welcome back!");
  };

  const handleOffline = () => {
    setIsOnline(false);
    alert("You are not connected to the internet. Some features may be unavailable.");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
      {/* Title on the left */}
      <div className="text-xl font-bold">
        Racing Setup
      </div>

      {/* Status on the center */}
      <div className="text-sm">
        <span>{isOnline ? "" : "Offline"}</span>
      </div>

      {/* Links on the right */}
      <div className="flex space-x-4">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="hover:underline text-red-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

