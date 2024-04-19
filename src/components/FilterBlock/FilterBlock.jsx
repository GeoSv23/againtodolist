import { useMyStore } from '../../store/store'
import styles from './FilterBlock.module.css'
export const FilterBlock = () => {
    const setFilter = useMyStore(state => state.setFilter)

    return(
        <div className={styles.FilterBlock}>
            <button className={styles.filterBtn} onClick={()=> setFilter('all')}>all</button>
            <button className={styles.filterBtn} onClick={()=> setFilter('active')}>was done</button>
            <button className={styles.filterBtn} onClick={()=> setFilter('done')}>active</button>
        </div>
    )
}