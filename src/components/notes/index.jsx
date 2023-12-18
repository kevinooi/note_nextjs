"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Notes = () => {
  // TODO: react query
  useEffect(() => {
    async function getNotes() {
      const res = await fetch(`/api/notes`);
      const { notes } = await res.json();
      setNotes(notes);
    }
    getNotes();
  }, []);

  const [notes, setNotes] = useState([]);

  return (
    <div className="pt-20 flex flex-wrap sm:justify-start justify-center gap-5">
      {notes.map((note) => (
        <div
          className="relative"
          key={note.id}
        >
          <Link href={`/notes/${note.id}`}>
            <div className="bg-gradient-to-br from-green-800 via-light-green-600 to-green-300 hover:from-green-600 p-4 w-[250px] h-[250px] rounded-lg cursor-pointer">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2 flex justify-between">
                {note.title}
              </h2>
              <p
                className="text-lg line-clamp-5"
                dangerouslySetInnerHTML={{
                  __html: note.content.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Notes;
