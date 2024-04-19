import { ControlBlock } from "../ControlBlock/ControlBlock"
import { FilterBlock } from "../FilterBlock/FilterBlock"
import { Todos } from "../Todos/Todos"
import styles from './wrapper.module.css'

export const Wrapper = () => {
    return(
        <div className={styles.Wrapper}> 
            <ControlBlock />
            <FilterBlock/>
            <Todos/>
        </div>
    )
} 