// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge"; // edgeでもOK。使いにくければ消してもいいです。

export async function POST(req: NextRequest) {
  try {
    // フロントからは「生のファイル」が送られてくる想定
    const arrayBuffer = await req.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    // ファイル名を適当に生成（PDF前提）
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `uploads/${timestamp}.pdf`;

    // Vercel Blob にアップロード
    const blob = await put(filename, bytes, {
      access: "public",
    });

    return NextResponse.json(
      {
        ok: true,
        url: blob.url,
        pathname: blob.pathname,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("upload error", error);
    return NextResponse.json({ ok: false, error: "upload failed" }, { status: 500 });
  }
}
