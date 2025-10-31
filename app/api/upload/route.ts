// app/api/uploads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge"; // 残してOK、外してもOK

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fileOrBlob = formData.get("file");

    // ここがポイント：File じゃなくても Blob ならOKにする
    if (!fileOrBlob || (typeof fileOrBlob !== "object")) {
      return NextResponse.json(
        { ok: false, error: "file is required" },
        { status: 400 }
      );
    }

    // Fileの場合は名前があるので使う。なければ固定名。
    const isFile = typeof File !== "undefined" && fileOrBlob instanceof File;
    const originalName = isFile ? (fileOrBlob as File).name : "upload.bin";

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `uploads/${timestamp}-${originalName}`;

    // put は Blob も File もそのまま受けられる
    const blob = await put(filename, fileOrBlob as Blob, {
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
