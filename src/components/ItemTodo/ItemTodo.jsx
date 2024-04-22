import styles from "./ItemTodo.module.css";
import { useMyStore } from "../../store/store";
import { useEffect, useRef } from "react";
export const ItemTodo = () => {
  const checkTodo = useMyStore((state) => state.checkTodo);
  const filter = useMyStore((state) => state.filter);
  const { fetchTodos } = useMyStore();
  const changeTodo = useMyStore((state) => state.changeTodo);
  const todoChanger = (id, newTitle) => {};

  const delTodo = useMyStore((state) => state.delTodo);
  const handleDelTodo = (id) => {
    delTodo(id);
  };
  const todos = useMyStore((state) => {
    switch (filter) {
      case "active":
        return state.todos.filter((todo) => todo.completed);
      case "done":
        return state.todos.filter((todo) => !todo.completed);
      default:
        return state.todos;
    }
  });
  //запрос к серверу
  // useEffect(() => {
  //   fetchTodos();
  // }, []);
  // const [value, setValue] = useState
  const todoRef = useRef();
  const handleTodoChange = (e, id) => {
    const newTitle = e.target.value;
    changeTodo(id, newTitle); // Обновляем заголовок задачи
  };

  // const todoOnFocus = (id) => {
  //   if ()
  //   todoRef.current.focus();
  // };
  return (
    <>
      {todos.map((item) => (
        <div key={item.id} className={styles.ItemTodo}>
          <input
            style={{ width: 30, height: 30, cursor: "pointer" }}
            checked={item.completed}
            type="checkbox"
            onChange={() => checkTodo(item.id)}
          />
          {/* <span>{item.id}</span> */}
          <input
            ref={todoRef}
            className={styles.itemTitle}
            onChange={(e) => handleTodoChange(e, item.id)} // Вызываем функцию при изменении значения
            value={item.title}
          ></input>
          <div className={styles.btnsContainer}>
            <button
              className={styles.ChangeBtn}
              // onClick={() => todoOnFocus(item.id)}
            >
              Edit
            </button>
            <button
              className={styles.DelBtn}
              onClick={() => handleDelTodo(item.id)}
            >
              Delette
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
