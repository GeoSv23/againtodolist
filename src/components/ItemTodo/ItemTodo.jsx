import styles from "./ItemTodo.module.css";
import { useMyStore } from "../../store/store";
import { useEffect } from "react";
export const ItemTodo = () => {
  const checkTodo = useMyStore((state) => state.checkTodo);
  const filter = useMyStore((state) => state.filter);
  const { fetchTodos } = useMyStore();
  const changeTodo = useMyStore(state => state.changeTodo)
  const todoChanger = (id, newTitle) => {

  }


  const delTodo = useMyStore(state => state.delTodo)
  const handleDelTodo = (id) => {
    delTodo(id)
  }
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
  console.log(todos);
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      {todos.map((item) => (
        <div key={item.id} className={styles.ItemTodo}>
          <input style={
            {width: 30,
            height:30,
            cursor:"pointer"}
          }
            checked={item.completed}
            type="checkbox"
            onChange={() => checkTodo(item.id)}
          />
          {/* <span>{item.id}</span> */}
          <h3 className={styles.itemTitle}>{item.title}</h3>
          <div className={styles.btnsContainer}>
            <button className={styles.ChangeBtn} onClick={() => todoChanger(item.id)}>Изменить</button>
            <button className={styles.DelBtn} onClick={()=>handleDelTodo(item.id)}>Удалить</button>
          </div>
        </div>
      ))}
    </>
  );
};
