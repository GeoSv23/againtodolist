import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const storage = typeof window !== "undefined" ? localStorage : null;

export const useMyStore = create(
  devtools(
    persist(
      (set, get) => ({
        todos: [],
        addTodo: (title) => {
          if (!title) {
            return;
          }
          const newTodo = {
            id: get().todos.length + 1,
            title,
            completed: false,
          };
          set({ todos: [newTodo, ...get().todos] });
        },
        changeTodo: (todoId, newTitle) => {
          set({
            todos: get().todos.map((todo) =>
              todoId === todo.id ? { ...todo, title: newTitle } : todo
            ),
          });
        },
        checkTodo: (todoId) =>
          set({
            todos: get().todos.map((todo) =>
              todoId === todo.id
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          }),
        delTodo: (todoId) =>
          set({
            todos: get().todos.filter((todo) => todo.id !== todoId),
          }),
        filter: "all",
        setFilter: (value) => set({ filter: value }),
        fetchTodos: async () => {
          try {
            const response = await fetch(
              "https://jsonplaceholder.typicode.com/todos"
            );
            if (!response.ok) {
              throw new Error("Не удалось получить список задач");
            }
            const data = await response.json();
            data.length = 3;
            set({ todos: data });
          } catch (error) {
            console.error("Ошибка при получении списка задач:", error);
          }
        },
      }),
      { name: "myStore", getStorage: () => storage }
    )
  )
);
