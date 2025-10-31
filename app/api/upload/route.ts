// app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: 'BLOB_READ_WRITE_TOKEN が設定されていません' },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const blob = await put(`uploads/${file.name}`, file, {
      access: 'public',
      token, // ← ここで明示的に渡す
    });

    return NextResponse.json({
      ok: true,
      url: blob.url,
      pathname: blob.pathname,
    });
  } catch (error: any) {
    console.error('upload error', error);
    return NextResponse.json(
      { error: error?.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
