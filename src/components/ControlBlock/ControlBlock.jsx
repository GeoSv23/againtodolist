import styles from './ControlBlock.module.css'
import { useMyStore } from '../../store/store'
import { useRef } from 'react'
export const ControlBlock = () => {
    const addTodo = useMyStore(state => state.addTodo)
    const ref = useRef()
    const handleAddTodo = () => {
        addTodo(ref.current.value)
        ref.current.value = ''
    }
    return(
        <div className={styles.controlBlockWrapper}>
            <input placeholder='Add a task...' ref={ref} onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()} className={styles.input} type="text" />
            <button onClick={handleAddTodo} className={styles.AddButton}>Add</button>
        </div>
    )
}