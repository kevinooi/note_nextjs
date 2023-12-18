import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

const isValidId = (id) => !/^[0-9]+$/.test(id);

export async function GET(request, { params }) {
  try {
    const id = Number(params.id);
    if (isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid note ID format." },
        { status: 400 }
      );
    }

    const note = await prisma.note.findUnique({
      where: { id },
    });
    if (!note) {
      return NextResponse.json(
        { success: false, message: "Note not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, note }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}

export const PUT = async (request, { params }) => {
  try {
    const id = Number(params.id);
    if (isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid note ID format." },
        { status: 400 }
      );
    }

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
    const note = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    return NextResponse.json({ success: true, note }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
};

export async function DELETE(request, { params }) {
  try {
    const id = Number(params.id);
    if (isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid note ID format." },
        { status: 400 }
      );
    }
    const note = await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, note }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}
