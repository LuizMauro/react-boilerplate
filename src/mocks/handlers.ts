import { http, HttpResponse } from "msw";
import { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task";
import { createTask } from "@/mocks/task-utils";

// Nosso "banco de dados" em memória
let tasks: Task[] = [
  createTask({
    title: "Estudar React",
    description: "Aprender sobre hooks e context",
    priority: "high",
    tags: ["estudos", "programação"],
  }),
  createTask({
    title: "Fazer compras",
    description: "Comprar itens para a semana",
    priority: "medium",
    dueDate: new Date(Date.now() + 86400000), // amanhã
  }),
];

export const handlers = [
  // GET /api/tasks
  http.get("/api/tasks", () => {
    return HttpResponse.json(tasks, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),

  // POST /api/tasks
  http.post("/api/tasks", async ({ request }) => {
    const input = (await request.json()) as CreateTaskInput;
    const newTask = createTask(input);
    tasks.push(newTask);

    return HttpResponse.json(newTask, {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),

  // PATCH /api/tasks/:id
  http.patch("/api/tasks/:id", async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as UpdateTaskInput;

    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Task not found",
      });
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date(),
    };

    tasks[taskIndex] = updatedTask;
    return HttpResponse.json(updatedTask, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),

  // DELETE /api/tasks/:id
  http.delete("/api/tasks/:id", ({ params }) => {
    const { id } = params;
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Task not found",
      });
    }

    tasks = tasks.filter((t) => t.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),
];
