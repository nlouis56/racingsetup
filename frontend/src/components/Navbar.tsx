import { useState, useEffect } from "react";
import Link from "next/link";
import router from "next/router";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    setIsAuthenticated(false);
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
      <div className="space-x-4">
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

