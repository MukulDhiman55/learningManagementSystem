"use client"; // Ensure this directive is here for client-side execution

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/services/api"; // Import the API service

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await registerUser(username, email, password); // Call the register service
      alert(result.message);
      router.push("/auth/login"); // Redirect after successful registration
    } catch (error: any) {
      setError(error.message); // Show error message from the API
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error if any */}
        <div>
          <label className="block text-sm font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;