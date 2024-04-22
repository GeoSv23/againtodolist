import styles from "./ItemTodo.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useMyStore } from "../../store/store";
import { useRef } from "react";
export const ItemTodo = () => {
  const checkTodo = useMyStore((state) => state.completed);
  const filter = useMyStore((state) => state.filter);
  const changeTodo = useMyStore((state) => state.changeTodo);

  const delTodo = useMyStore((state) => state.del);
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

  const todoRef = useRef();
  const handleTodoChange = (e, id) => {
    const newTitle = e.target.value;
    changeTodo(id, newTitle); 
  };

  // const todoOnFocus = (id) => {
  //   if ()
  //   todoRef.current.focus();
  // };
  return (
    <>
      {todos.map((item) => (
        <div key={uuidv4} className={styles.ItemTodo}>
          <input
            style={{ width: 30, height: 30, cursor: "pointer" }}
            checked={item.completed}
            type="checkbox"
            onChange={() => checkTodo(item.id)}
          />
          <input
            ref={todoRef}
            className={styles.itemTitle}
            onChange={(e) => handleTodoChange(e, item.id)} 
            value={item.title}
          ></input>
          <div className={styles.btnsContainer}>
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
