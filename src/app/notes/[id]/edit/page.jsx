"use client";

import { useRouter } from "next/navigation";
import { NoteForm } from "../../../../components/notes/form";
import { useEditNote, useGetNote } from "../../../../hooks/useNotes";

export default function EditNotePage({ params: { id } }) {
  const router = useRouter();
  const { data, isLoading, error } = useGetNote(id);
  const editNote = useEditNote(() => router.back());
  const onSubmit = async (data) => editNote.mutate(data);

  return (
    <>
      {isLoading && (
        <h1 className="pt-20 w-full flex justify-center items-center">
          Loading...
        </h1>
      )}

      {error && (
        <h1 className="pt-20 w-full flex justify-center items-center">
          Oops! An error has occured!
        </h1>
      )}

      {data?.note && (
        <NoteForm
          title="Edit Note"
          note={data.note}
          onSubmit={onSubmit}
          errors={editNote.data?.errors}
          disabled={editNote.isPending}
        />
      )}
    </>
  );
}
