import Icon from "@mdi/react";
import Link from "next/link";
import { mdiPlus } from "@mdi/js";
import Notes from "../components/notes";

export default function Home() {
  return (
    <div className="max-w-[1220px] mx-auto py-20 px-10 md:px-20">
      <div className="flex justify-between">
        <h1 className="text-5xl">Notes</h1>
        <Link href="/notes/create">
          <button className="flex gap-x-1 items-center p-3 rounded-lg bg-green-600  hover:bg-green-700 active:bg-green-800">
            <Icon
              path={mdiPlus}
              size={0.8}
            />
            <span className="font-bold">New</span>
          </button>
        </Link>
      </div>
      <Notes />
    </div>
  );
}
