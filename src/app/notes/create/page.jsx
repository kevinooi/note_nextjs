"use client";

import { useRouter } from "next/navigation";
import { NoteForm } from "../../../components/notes/form";

export default function CreateNotePage() {
  const router = useRouter();

  const createNote = async ({ title, content }) => {
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const { errors } = await res.json();

      if (!errors) {
        router.replace("/");
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
      title="Create Note"
      onSubmit={createNote}
    />
  );
}
