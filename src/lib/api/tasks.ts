import { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task";

export const tasksApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await fetch("/api/tasks");
    if (!response.ok) throw new Error("Erro ao buscar tarefas");
    return response.json();
  },

  createTask: async (input: CreateTaskInput): Promise<Task> => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error("Erro ao criar tarefa");
    return response.json();
  },

  updateTask: async (id: string, input: UpdateTaskInput): Promise<Task> => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error("Erro ao atualizar tarefa");
    return response.json();
  },

  deleteTask: async (id: string): Promise<void> => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar tarefa");
  },
};
