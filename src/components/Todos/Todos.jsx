import styles from './Todos.module.css'
import {ItemTodo} from '../ItemTodo/ItemTodo'
export const Todos = () => {
    return(
        <div className={styles.AllTodos}>
            <ItemTodo/>
        </div>
    )
}