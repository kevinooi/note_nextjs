"use client";

import { useRouter } from "next/navigation";
import { NoteForm } from "../../../components/notes/form";
import { useCreateNote } from "../../../hooks/useNotes";

export default function CreateNotePage() {
  const router = useRouter();
  const createNote = useCreateNote(() => router.back());
  const onSubmit = async (data) => createNote.mutate(data);

  return (
    <NoteForm
      title="Create Note"
      onSubmit={onSubmit}
      errors={createNote.data?.errors}
      disabled={createNote.isPending}
    />
  );
}
