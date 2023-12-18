"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

async function getNotes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/notes`);
  return await res.json();
}

const Notes = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: () => getNotes(),
  });

  return (
    <div className="pt-20 flex flex-wrap sm:justify-start justify-center gap-5">
      {/* TODO: add loader */}
      {isLoading && (
        <h1 className="w-full flex justify-center items-center">Loading...</h1>
      )}
      {/* TODO: add error ui */}
      {error && (
        <h1 className="w-full flex justify-center items-center">
          Oops! An error has occured!
        </h1>
      )}
      {data != null &&
        data?.notes.map((note) => (
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
