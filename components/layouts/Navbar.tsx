"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
}

function Navbar() {

  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    }

    fetchUser();

  }, [pathname]);

  return (
    <nav className="flex items-center gap-8 justify-end bg-space-dark text-white fixed p-4 top-0 left-0 w-full z-20">
      <div className="flex items-center gap-8 hidden lg:flex">
        {!user && (
          <>
            <Link href="/">Hem</Link>
          </>
        )}
        
        <Link href="/about">Om oss</Link>

        {user && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/market">Marknad</Link>
          </>
        )}
      </div>
      <button className="lg:hidden cursor-pointer">
        <img src="/hamburger-menu.svg" alt="Menu" className="w-[40px]" />
      </button>
    </nav>
  );
}

export default Navbar;