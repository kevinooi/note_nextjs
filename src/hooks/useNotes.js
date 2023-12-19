import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetNotes() {
  async function getNotes() {
    const res = await fetch(`/api/notes`);
    return await res.json();
  }

  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
}

export function useGetNote(id) {
  async function getNote(id) {
    const res = await fetch(`/api/notes/${id}`, {
      next: { revalidate: 10 },
    });
    return await res.json();
  }

  return useQuery({
    queryKey: ["note"],
    queryFn: () => getNote(id),
    retry: 1,
  });
}

export function useCreateNote(callback) {
  const queryClient = useQueryClient();

  async function storeNote({ title, content }) {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    return await res.json();
  }

  return useMutation({
    mutationFn: storeNote,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: "notes" });
    },
    onSuccess: (data) => {
      if (data.success) {
        callback();
      }
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: "notes" });
    },
  });
}

export function useEditNote(callback) {
  const queryClient = useQueryClient();

  async function updateNote({ id, title, content }) {
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    return await res.json();
  }

  return useMutation({
    mutationFn: updateNote,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: "notes" });
    },
    onSuccess: (data) => {
      if (data.success) {
        callback();
      }
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: "notes" });
    },
  });
}

export function useDeleteNote(callback) {
  const queryClient = useQueryClient();

  async function destroyNote(id) {
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  }

  return useMutation({
    mutationFn: destroyNote,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: "notes" });
    },
    onSuccess: (data) => {
      if (data.success) {
        callback();
      }
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: "notes" });
    },
  });
}
