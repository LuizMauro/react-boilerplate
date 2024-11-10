import { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task";
import { api } from "./axios";

export const tasksApi = {
  getTasks: async () => {
    const { data } = await api.get<Task[]>("/tasks");
    return data;
  },

  createTask: async (input: CreateTaskInput) => {
    const { data } = await api.post<Task>("/tasks", input);
    return data;
  },

  updateTask: async (id: string, input: UpdateTaskInput) => {
    const { data } = await api.patch<Task>(`/tasks/${id}`, input);
    return data;
  },

  deleteTask: async (id: string) => {
    await api.delete(`/tasks/${id}`);
    return id; // Retornando o ID para usar no onSuccess
  },
};
