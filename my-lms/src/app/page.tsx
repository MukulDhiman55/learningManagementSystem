
"use client"; // This ensures that this page only runs on the client side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HomePage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Track client-side mounting

  // Check if the component is mounted before accessing localStorage
  useEffect(() => {
    setIsMounted(true); // Set mounted to true after the component is mounted
    const role = localStorage.getItem("role"); // Fetch the role from localStorage
    setUserRole(role); // Set the role in state
  }, []);

  // Ensure the component doesn't try to render SSR HTML before the client is ready
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div>Loading...</div> {/* Show loading state while waiting for client-side data */}
      </div>
    );
  }

  const handleLogin = () => {
    // Redirect to login page if user is not logged in
    router.push("/auth/login");
  };

  const handleRegister = () => {
    // Redirect to registration page if user is not registered
    router.push("/auth/register");
  };

  return (
    <div className="min-h-screen bg-gray-100">


      <main className="flex justify-center items-center p-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Welcome to the Learning Management System
          </h2>
          <p className="text-lg mb-4">
            Browse our courses, enroll, and learn from the best instructors.
          </p>
          
            <p className="text-lg">
              Please{" "}
              <button onClick={handleLogin} className="text-blue-500">
                Login
              </button>{" "}
              to access more features.
              
            </p>
            
              <p className="text-lg">
              Please {" "}
              <button onClick={handleRegister} className="text-blue-500">
                Register
              </button>
              {" "}
              Register yourself if visiting frist timeto access our services.
              
            </p>
          
        </div>
      </main>
    </div>
  );
};

export default HomePage;