"use client"; // Ensure this directive is here for client-side execution

import { useState } from "react";
import { useRouter } from "next/navigation"; // use next/navigation for client-side routing in Next.js 13
import { login } from "@/app/services/api"; // Ensure your API call is correct
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter(); // Hook for routing after successful login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Send login request to the API
      const data = await login(email, password); 

      if (data.token) {
        // Decode the JWT token to extract the user role
        const decodedToken: any = jwtDecode(data.token); // Decode the token
        console.log(decodedToken); // Log to check the decoded token

        // Extract the role from the decoded token
        const userRole = decodedToken.role;

        // Store the decoded role and token in localStorage
        localStorage.setItem("role", userRole); // Save role in localStorage
        localStorage.setItem("token", data.token); // Save token in localStorage

        // Redirect based on the user's role
        if (userRole === 'admin') {
          // Redirect admin to the admin dashboard
          router.push("/admin");
        } else {
          // Redirect regular user to the user dashboard
          router.push("/user");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Logging in..." : "Login"} {/* Change text when loading */}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;