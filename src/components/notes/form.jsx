"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function NoteForm({ title, note = null, onSubmit, errors, disabled }) {
  const router = useRouter();
  const initialFormState = {
    title: note?.title ?? "",
    content: note?.content ?? "",
  };
  const [form, setForm] = useState(initialFormState);
  const isFormEmpty = Object.keys(form)
    .filter((v) => v != "errors")
    .every((v) => form[v] == null || form[v] == "");

  const handleSubmit = async () => {
    await onSubmit({
      id: note?.id ?? undefined,
      title: form.title,
      content: form.content,
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="max-w-md mx-auto pt-20">
      <div>{disabled}</div>
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
          errors?.title != null ? "mb-2 border-red-700 border-2" : "mb-4"
        } border rounded`}
      />
      {errors?.title != null && (
        <div className=" text-red-700 mb-2">{errors.title}</div>
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
          errors?.content != null ? "border-red-700 border-2" : " mb-4"
        } border rounded`}
        rows="5"
      />
      {errors?.content != null && (
        <div className="text-red-700 mb-2">{errors.content}</div>
      )}
      <button
        onClick={handleCancel}
        className="bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-green-300 text-white py-2 px-4 rounded me-4"
      >
        Back
      </button>
      <button
        onClick={handleSubmit}
        disabled={isFormEmpty || disabled}
        className="bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-green-300 text-white py-2 px-4 rounded"
      >
        {title}
      </button>
    </div>
  );
}
