import { create } from 'zustand'

export const useMyStore = create((set, get) => ({
  todos: [],
  addTodo: (title) => {
    const newTodo = {id: get().todos.length + 1 , title, completed: false}
    set({todos: [newTodo, ...get().todos ]})
  },
  // changeTodo: (todoId, newTitle) => {
  //   set({
  //     todos: get().todos.map(todo =>
  //       todoId === todo.id ? { ...todo, title: newTitle } : todo
  //     )
  //   });
  // },
  checkTodo: (todoId) => set({
    todos: get().todos.map(todo =>
      todoId === todo.id ? {...todo, completed: !todo.completed} : todo
      )
  }),
  delTodo: (todoId) => set({
    todos: get().todos.filter(todo => todo.id !== todoId)
  }),
  filter: 'all',
  setFilter: (value) => set({filter: value})
  ,
  fetchTodos: async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      data.length = 3
      set({ todos: data });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

}));