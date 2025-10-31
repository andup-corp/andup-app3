// app/uploads/page.tsx
import { list } from "@vercel/blob";
import Link from "next/link";

export default async function UploadsPage() {
  const { blobs } = await list({ prefix: "uploads/" });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">アップロード済みファイル一覧</h1>

      {blobs.length === 0 ? (
        <p>まだファイルがありません。</p>
      ) : (
        <ul className="space-y-2">
          {blobs.map((blob) => (
            <li
              key={blob.url}
              className="border p-2 rounded-md flex justify-between items-center"
            >
              <Link
                href={blob.url}
                target="_blank"
                className="text-blue-600 underline truncate max-w-[70%]"
              >
                {blob.pathname.replace("uploads/", "")}
              </Link>
              <span className="text-gray-500 text-sm">
                {(blob.size / 1024).toFixed(1)} KB
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
