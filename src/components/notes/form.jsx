"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function NoteForm({ title, note = null, onSubmit }) {
  const router = useRouter();
  const initialFormState = {
    title: note?.title ?? "",
    content: note?.content ?? "",
    errors: {
      title: null,
      content: null,
    },
  };
  const [form, setForm] = useState(initialFormState);
  const isFormEmpty = Object.keys(form)
    .filter((v) => v != "errors")
    .every((v) => form[v] == null || form[v] == "");

  const handleSubmit = async () => {
    const errors = await onSubmit(form);
    if (errors) {
      setForm((prevState) => ({
        ...prevState,
        errors,
      }));
    } else {
      router.push(`/`);
    }
  };
  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="max-w-md mx-auto pt-20">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm((prevState) => ({
            ...prevState,
            title: e.target.value,
          }))
        }
        className={`w-full p-2 ${
          form.errors?.title != null ? "mb-2 border-red-700 border-2" : "mb-4"
        } border rounded`}
      />
      {form.errors?.title != null && (
        <div className=" text-red-700 mb-2">{form.errors.title}</div>
      )}
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) =>
          setForm((prevState) => ({
            ...prevState,
            content: e.target.value,
          }))
        }
        className={`w-full p-2 ${
          form.errors?.content != null ? "border-red-700 border-2" : " mb-4"
        } border rounded`}
        rows="5"
      />
      {form.errors?.content != null && (
        <div className="text-red-700 mb-2">{form.errors.content}</div>
      )}
      <button
        onClick={handleCancel}
        className="bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-green-300 text-white py-2 px-4 rounded me-4"
      >
        Back
      </button>
      <button
        onClick={handleSubmit}
        disabled={isFormEmpty} // TODO: check loading state
        className="bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-green-300 text-white py-2 px-4 rounded"
      >
        {title}
      </button>
    </div>
  );
}
