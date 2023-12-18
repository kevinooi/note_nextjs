"use client";

import { mdiArrowLeft, mdiDelete, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NoteDetails = ({ params: { id } }) => {
  const router = useRouter();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getNote(id) {
      try {
        const res = await fetch(`/api/notes/${id}`, {
          next: { revalidate: 10 },
        });
        const { note } = await res.json();
        setNote(note);
      } catch (err) {
        setError(err);
      }
    }
    getNote(id);
  }, []);

  const handleEdit = (note) => {
    router.push(`/notes/${note.id}/edit`);
  };
  const handleDelete = async (id) => {
    const result = confirm(`Are you sure you want to delete this note?`);
    if (result) {
      const res = fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const { success } = await res.json();
      if (success) router.push("/");
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
      {note && (
        <div className="p-8 rounded-lg bg-gradient-to-br from-green-800 via-light-green-600 to-green-300">
          <div className="flex items-center mb-4">
            <Icon
              path={mdiArrowLeft}
              onClick={() => router.back()}
              className="cursor-pointer"
              size={0.8}
            />
            <h2 className="flex-grow text-center text-2xl font-semibold ml-2">
              {note.title}
            </h2>
            <button
              onClick={() => handleEdit(note)}
              className="me-2"
            >
              <Icon
                path={mdiPencil}
                size={1}
                color="white"
              />
            </button>
            <button onClick={() => handleDelete(note.id)}>
              <Icon
                path={mdiDelete}
                size={1}
                color="white"
              />
            </button>
          </div>
          <p className="text-sm mb-2">
            Created on {formattedDate(note.createdAt)}
          </p>
          {note.updatedAt && (
            <p className="text-sm mb-2">
              Updated on {formattedDate(note.updatedAt)}
            </p>
          )}
          <div className="border-b border-white mb-4"></div>
          <p className="text-base">{note.content}</p>
        </div>
      )}
      {error && (
        <div>
          <p>Error: {error.message}</p>
        </div>
      )}
    </div>
  );
};

export default NoteDetails;
