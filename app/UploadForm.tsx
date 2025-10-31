// app/UploadForm.tsx
"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setMessage("アップロード中…");

    const response = await fetch("/api/upload", {
      method: "POST",
      body: file,
    });

    if (response.ok) {
      const data = await response.json();
      setMessage(`アップロード完了！URL: ${data.url}`);
    } else {
      setMessage("アップロード失敗");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        アップロード
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

