import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, notes }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}

export const POST = async (request) => {
  try {
    const { title, content } = await request.json();
    if (!title) {
      return NextResponse.json(
        { success: false, errors: { title: "Title is required" } },
        { status: 400 }
      );
    }
    if (!content) {
      return NextResponse.json(
        { success: false, errors: { content: "Content is required" } },
        { status: 400 }
      );
    }
    const note = await prisma.note.create({
      data: { title, content },
    });

    return NextResponse.json({ success: true, note }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
};
