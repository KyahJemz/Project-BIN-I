import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import { ErrorResponses } from '@/utils/errorResponses';
import { env } from "@/env.mjs";

const uploadDir = "public/images/";

export const POST = async (request: NextRequest) => {
  const data = await request.formData();
  const file = data.get('file') ?? data.get('image');
  const category: FormDataEntryValue | null  = data.get('category') as string;
  const id: FormDataEntryValue | null  = data.get('id') as string;

  if (!category || !id) {
    return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
  }

  const validCategories: string[] = ['news', 'announcements', 'events', 'profiles', 'editorjs'];
  if (!validCategories.includes(category)) {
    return NextResponse.json({ message: 'Invalid category' }, { status: 400 });
  }

  try {
    if (typeof file.arrayBuffer === 'function') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      console.log("1")
      const categoryDir = path.join(uploadDir, category);
      await fs.promises.mkdir(categoryDir, { recursive: true });
      console.log("2")
      const fileName = `${new Date().toISOString().replaceAll(":", "-")}_${path.extname(file.name)}`;
      const filePath = path.join(categoryDir, fileName);
      console.log("3")
      if (fs.existsSync(filePath)) {
        await unlink(filePath);
      }
      console.log("4")
      console.log(filePath)
      await writeFile(filePath, buffer);
      console.log("5")

      return NextResponse.json({ message: 'File uploaded successfully', fileName: fileName, success: 1 , file: { url: env.NEXT_PUBLIC_BASE_URL + "/images/" + category + "/" + fileName }}, { status: 200 });
    } else {
      return NextResponse.json({ message: 'File processing error' }, { status: 400 });
    }
  } catch (error: any) {
    console.error(error.message);
    const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
};