// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge"; // edgeじゃなければ消してOK

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "file is required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const originalName = file.name || "upload.bin";
    const filename = `uploads/${timestamp}-${originalName}`;

    // ★ここがポイント：Uint8Arrayにせず、Fileのまま渡す
    const blob = await put(filename, file, {
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
    return NextResponse.json(
      { ok: false, error: "upload failed" },
      { status: 500 }
    );
  }
}
