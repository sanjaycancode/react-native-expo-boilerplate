import axios from "axios";

import type { CreateTodoPayload, Todo, UpdateTodoPayload } from "@/types";

const TODOS_BASE_URL = "https://jsonplaceholder.typicode.com";

const todosApiClient = axios.create({
  baseURL: TODOS_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export async function getTodos() {
  const response = await todosApiClient.get<Todo[]>("/todos");
  return response.data;
}

export async function getTodoById(id: number) {
  const response = await todosApiClient.get<Todo>(`/todos/${id}`);
  return response.data;
}

export async function createTodo(payload: CreateTodoPayload) {
  const response = await todosApiClient.post<Todo>("/todos", payload);
  return response.data;
}

export async function updateTodo(id: number, payload: UpdateTodoPayload) {
  const response = await todosApiClient.put<Todo>(`/todos/${id}`, payload);
  return response.data;
}

export async function deleteTodo(id: number) {
  await todosApiClient.delete(`/todos/${id}`);
}
