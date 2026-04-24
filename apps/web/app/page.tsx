"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6">Arogya AI</h1>
      <p className="text-gray-300 mb-10">
        Smart Health Insurance Recommendation
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => router.push("/recommend")}
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Get Recommendation
        </button>

        <button
          onClick={() => router.push("/admin/login")}
          className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
        >
          Admin Panel
        </button>
      </div>
    </div>
  );
}