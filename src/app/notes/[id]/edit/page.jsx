"use client";

import { useRouter } from "next/navigation";
import { NoteForm } from "../../../../components/notes/form";

export default function EditNotePage({ params: { id } }) {
  // TODO: getNoteById
  const router = useRouter();

  const editNote = async ({ title, content }) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const { errors } = await res.json();

      if (!errors) {
        router.push("/");
      } else {
        return errors;
      }
    } catch (err) {
      console.log(err);
      alert(err.message ?? "Something went wrong");
    }
  };

  return (
    <NoteForm
      title="Edit Note"
      onSubmit={editNote}
    />
  );
}
