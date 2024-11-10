import { http, HttpResponse } from "msw";
import { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task";
import { createTask } from "./task-utils";

// Nosso "banco de dados" em memória
let tasks: Task[] = [
  createTask({
    title: "Implementar autenticação",
    description: "Adicionar login com Google e GitHub",
    priority: "high",
    status: "in-progress",
    tags: ["feature", "segurança"],
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 dias
  }),
  createTask({
    title: "Corrigir bug no filtro de tarefas",
    description: "O filtro não está funcionando corretamente para tags",
    priority: "high",
    status: "todo",
    tags: ["bug", "urgente"],
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 dia
  }),
  createTask({
    title: "Atualizar documentação",
    description: "Documentar novas funcionalidades implementadas",
    priority: "low",
    status: "todo",
    tags: ["documentação"],
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 dias
  }),
  createTask({
    title: "Otimizar performance",
    description: "Melhorar tempo de carregamento da aplicação",
    priority: "medium",
    status: "in-progress",
    tags: ["performance", "tech-debt"],
  }),
  createTask({
    title: "Reunião com stakeholders",
    description: "Apresentar progresso do projeto",
    priority: "medium",
    status: "done",
    tags: ["reunião", "apresentação"],
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // ontem
  }),
  createTask({
    title: "Design System",
    description: "Criar componentes base do design system",
    priority: "high",
    status: "done",
    tags: ["ui", "design"],
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
  }),
  createTask({
    title: "Testes unitários",
    description: "Aumentar cobertura de testes",
    priority: "medium",
    status: "todo",
    tags: ["testes", "qualidade"],
  }),
  createTask({
    title: "Refatorar código legado",
    description: "Modernizar componentes antigos",
    priority: "low",
    status: "in-progress",
    tags: ["refactor", "tech-debt"],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
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
