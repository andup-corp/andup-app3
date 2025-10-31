// app/uploads/page.tsx
'use client';

import React, { useState } from 'react';

type UploadedFile = {
  url: string;
  name: string;
};

export default function UploadsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'アップロードに失敗しました');
      }

      // 画面上のリストに追加
      setUploads((prev) => [
        {
          url: json.url,
          name: file.name,
        },
        ...prev,
      ]);

      setFile(null);
    } catch (err: any) {
      setError(err.message ?? 'アップロードに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">ファイルアップロード</h1>

      <div className="space-y-3">
        <input type="file" onChange={handleFileChange} className="block" />
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
        >
          {loading ? 'アップロード中…' : 'アップロード'}
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">アップロード済み</h2>
        {uploads.length === 0 ? (
          <p className="text-sm text-gray-500">まだファイルはありません。</p>
        ) : (
          <ul className="space-y-2">
            {uploads.map((f) => (
              <li key={f.url}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
