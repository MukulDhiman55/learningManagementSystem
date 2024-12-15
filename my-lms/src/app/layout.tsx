// src/app/layout.tsx
import './styles/globals.css'; // Global CSS
import { ReactNode } from "react";
import Header from './components/Hearder';
import Link from 'next/link'; // Import your Header component

// Function to check if user is an admin (from localStorage)
const checkAdminRole = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("role") === "admin";
  }
  return false;
};

const Layout = ({ children }: { children: ReactNode }) => {
  const admin = checkAdminRole();

  return (
    <html>
      <body>
    <div className="min-h-screen bg-gray-100">
      {/* Include Header component */}
      <Header />

      <div className="flex">
        {admin && (
          <aside className="w-64 bg-gray-800 text-white p-4">
            <h2 className="font-semibold text-xl mb-4">Admin Dashboard</h2>
            <ul>
              <li>
                <Link href="/admin/courses" className="block py-2 hover:bg-blue-500">
                  Manage Courses
                </Link>
              </li>
            </ul>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
    </body>
    </html>
  );
};

export default Layout;
