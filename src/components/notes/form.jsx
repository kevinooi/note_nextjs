"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function NoteForm({ title, onSubmit }) {
  const router = useRouter();
  const initialFormState = {
    title: "",
    content: "",
    errors: {
      title: null,
      content: null,
    },
  };
  const [formState, setFormState] = useState(initialFormState);
  const isFormEmpty = Object.keys(formState)
    .filter((v) => v != "errors")
    .every((v) => formState[v] == null || formState[v] == "");

  const handleSubmit = async () => {
    const errors = await onSubmit(formState);
    if (errors) {
      setFormState((prevState) => ({
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
      {/* TODO: Change error border red styling */}
      <input
        type="text"
        placeholder="Title"
        value={formState.title}
        onChange={(e) =>
          setFormState((prevState) => ({
            ...prevState,
            title: e.target.value,
          }))
        }
        className={`w-full p-2 ${
          formState.errors?.title != null ? "mb-2" : "mb-4"
        } border rounded`}
      />
      {formState.errors?.title != null && (
        <div className=" text-red-700 mb-2">{formState.errors.title}</div>
      )}
      {/* TODO: Change error border red styling */}
      <textarea
        placeholder="Content"
        value={formState.content}
        onChange={(e) =>
          setFormState((prevState) => ({
            ...prevState,
            content: e.target.value,
          }))
        }
        className={`w-full p-2 ${
          formState.errors?.content != null ? "" : "mb-4"
        } border rounded`}
        rows="5"
      />
      {formState.errors?.content != null && (
        <div className="text-red-700 mb-2">{formState.errors.content}</div>
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
