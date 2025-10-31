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

    // ★ここが超重要：FormDataで送る
    const formData = new FormData();
    formData.append("file", file); // ←サーバー側の「file」と一致させる

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      setMessage(
        "アップロード失敗" + (err?.error ? `：${err.error}` : "")
      );
      return;
    }

    const data = await res.json();
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
