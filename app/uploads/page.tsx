// app/page.tsx
import Link from "next/link";
import UploadForm from "./UploadForm";

export default function Home() {
  return (
    <main className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">PDFアップロードツール</h1>
      <UploadForm />
      <Link href="/uploads" className="text-blue-600 underline">
        アップロード済みファイルを見る
      </Link>
    </main>
  );
}
