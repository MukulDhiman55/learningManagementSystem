"use client"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminDashboard = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);  // Store role in state
  const [loading, setLoading] = useState<boolean>(true);  // Loading state to handle client-side checks

  useEffect(() => {
    // Only check the role on the client-side after the component is mounted
    const role = localStorage.getItem("role");
    setUserRole(role); // Set the role in state
    setLoading(false);  // Set loading to false once we've checked the role

    // If the user is not an admin, redirect to home page
    if (role !== "admin") {
      router.push("/"); // Redirect to the home page if not an admin
    }
  }, [router]);

  // Prevent rendering until the role is checked (display loading state)
  if (loading) {
    return <div>Loading...</div>;  // You can replace this with a more sophisticated loading spinner or placeholder
  }

  // If the user is not an admin, return nothing (or redirect as per your logic)
  if (userRole !== "admin") {
    return null;  // Or render an error message, a redirect, or a page informing them they're not an admin
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold">Welcome, Admin!</h1>
      <p className="mt-4 text-lg">Manage your courses here.</p>

      <div className="mt-6">
        <Link
          href="/admin/courses"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Manage Courses
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;