"use client";

import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Learning Management System</Link>
        <nav>
          <ul className="flex space-x-6">
            
            <li>
              <Link href="/auth/login" className="hover:text-gray-400">Login</Link>
            </li>
            <li>
              <Link href="/auth/register" className="hover:text-gray-400">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;