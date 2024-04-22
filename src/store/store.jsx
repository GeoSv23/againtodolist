import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const storage = typeof window !== "undefined" ? localStorage : null;

export const useMyStore = create(
  devtools(
    persist(
      (set, get) => ({
        todos: [],
        add: (title) => {
          if (title.value === '' || title.replace(/\s/g, '') === '') {
            return;
           } 
          const newTodo = {
            id: get().todos.length + 1,
            title,
            completed: false,
          };
          set({ todos: [newTodo, ...get().todos] });
        },
        delAll: () => set({todos: []}),
        changeTodo: (todoId, newTitle) => {
          set({
            todos: get().todos.map((todo) =>
              todoId === todo.id ? { ...todo, title: newTitle } : todo
            ),
          });
        },
        //name change
        completed: (todoId) =>
          set({
            todos: get().todos.map((todo) =>
              todoId === todo.id
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          }),
        del: (todoId) =>
          set({
            todos: get().todos.filter((todo) => todo.id !== todoId),
          }),
        filter: "all",
        setFilter: (value) => set({ filter: value }),
        fetchTodos: async () => {
          try {
            //QUERY параметры длины 
            const response = await fetch(
              "https://jsonplaceholder.typicode.com/todos?_limit=3"
            );
            if (!response.ok) {
              throw new Error("Не удалось получить список задач");
            }
            const data = await response.json();
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
