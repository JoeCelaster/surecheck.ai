"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔥 Fetch uploaded files
  const fetchFiles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/policy/files");
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      console.log("Failed to fetch files");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Select a file");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/policy/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("✅ Uploaded successfully");
        setFile(null);
        fetchFiles(); // refresh list
      } else {
        setMessage("❌ Upload failed");
      }
    } catch {
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileId: string) => {
    try {
      await fetch(
        `http://localhost:5000/api/policy/delete/${fileId}`,
        { method: "DELETE" }
      );

      setFiles((prev) => prev.filter((f) => f !== fileId));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

        {/* Upload */}
        <div className="mb-6">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="ml-4 bg-black text-white px-4 py-2 rounded"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <p className="mt-2 text-sm">{message}</p>
        </div>

        {/* File List */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Uploaded Policies</h2>

          {files.length === 0 && (
            <p className="text-gray-400">No files uploaded</p>
          )}

          {files.map((fileId) => (
            <div
              key={fileId}
              className="flex justify-between items-center border p-3 rounded mb-2"
            >
              <span className="text-sm">{fileId}</span>

              <button
                onClick={() => handleDelete(fileId)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}