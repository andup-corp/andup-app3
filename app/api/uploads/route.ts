import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "uploads/" });
    const data = blobs.map((b) => ({
      pathname: b.pathname,
      url: b.url,
      size: b.size,
      uploadedAt: b.uploadedAt,
    }));
    return NextResponse.json({ ok: true, items: data });
  } catch (err) {
    console.error("list error", err);
    return NextResponse.json({ ok: false, error: "LIST_FAILED" }, { status: 500 });
  }
}
