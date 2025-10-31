// app/UploadForm.tsx
"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      setMessage("ファイルを選んでください");
      return;
    }

    setMessage("アップロード中…");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      setMessage("アップロード失敗" + (data?.error ? `：${data.error}` : ""));
      return;
    }

    setMessage(`アップロード完了！URL: ${data.url}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
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
