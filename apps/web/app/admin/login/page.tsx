"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 🔥 simple auth (for assignment)
    if (username === "admin" && password === "admin123") {
      router.push("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Admin Login</h2>

        <input
          placeholder="Username"
          className="w-full p-2 bg-gray-700 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 bg-gray-700 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white text-black py-2 rounded font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}