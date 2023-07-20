import styles from './Header.module.css'
import todoLogo from '../assets/todo-logo.svg'
import { Info } from './Info'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { reducerStateType } from '../redux/store'

export function Header() {
  const info = useSelector((state: reducerStateType) => state.todos.info)
  const numberOfPreviousCycles = useSelector(
    (state: reducerStateType) => state.cycles.cycles.length,
  )
  const activeCycleId = useSelector(
    (state: reducerStateType) => state.cycles.activeCycleId,
  )

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <NavLink to="/">
          <img src={todoLogo} alt="TOTO logo" />
        </NavLink>

        <div className={styles.infoContainer}>
          <Info
            title="All Todos"
            amount={`${info.totalCompleted} of ${info.total}`}
            numberHighlight={
              (info.totalCompleted === info.total && info.total > 0) || false
            }
          />
          <Info
            title="All Tasks"
            amount={`${info.totalTasksCompleted} of ${info.totalTasks}`}
            purple
            numberHighlight={
              (info.totalTasksCompleted === info.totalTasks &&
                info.totalTasks > 0) ||
              false
            }
          />
          <Info title="Cycles" amount={`${numberOfPreviousCycles}`} />
          {activeCycleId && (
            <Info
              blink
              purple
              numberHighlight
              title="In progress"
              amount={`1`}
            />
          )}
        </div>
      </div>
    </header>
  )
}
