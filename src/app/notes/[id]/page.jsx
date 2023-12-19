"use client";

import { mdiArrowLeft, mdiDelete, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { useParams, useRouter } from "next/navigation";
import { useDeleteNote, useGetNote } from "../../../hooks/useNotes";

const NoteDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading, error } = useGetNote(id);

  const handleEdit = (note) => {
    router.push(`/notes/${note.id}/edit`);
  };

  const deleteNote = useDeleteNote(() => router.push("/"));
  const handleDelete = async (id) => {
    const result = confirm(`Are you sure you want to delete this note?`);
    if (result) {
      deleteNote.mutate(id);
    }
  };

  const formattedDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {isLoading && (
        <h1 className="w-full flex justify-center items-center">Loading...</h1>
      )}

      {error && (
        <h1 className="w-full flex justify-center items-center">
          Oops! An error has occured!
        </h1>
      )}

      {data?.note && (
        <div className="p-8 rounded-lg bg-gradient-to-br from-green-800 via-light-green-600 to-green-300">
          <div className="flex items-center mb-4">
            <Icon
              path={mdiArrowLeft}
              onClick={() => router.back()}
              className="cursor-pointer"
              size={0.8}
            />
            <h2 className="flex-grow text-center text-2xl font-semibold ml-2">
              {data.note.title}
            </h2>
            <button
              onClick={() => handleEdit(data.note)}
              className="me-2"
            >
              <Icon
                path={mdiPencil}
                size={1}
                color="white"
              />
            </button>
            <button onClick={() => handleDelete(data.note.id)}>
              <Icon
                path={mdiDelete}
                size={1}
                color="white"
              />
            </button>
          </div>
          <p className="text-sm mb-2">
            Created on {formattedDate(data.note.createdAt)}
          </p>
          {data.note.updatedAt && (
            <p className="text-sm mb-2">
              Updated on {formattedDate(data.note.updatedAt)}
            </p>
          )}
          <div className="border-b border-white mb-4"></div>
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: data.note.content.replace(/\n/g, "<br />"),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NoteDetails;
