// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge"; // edgeがイヤなら消してOK

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

    // 元のファイル名を残したいので取る。なければ日時で。
    const originalName = file.name || "upload.pdf";
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `uploads/${timestamp}-${originalName}`;

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

