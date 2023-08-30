import styles from './Header.module.css'
import todoLogo from '../assets/todo-logo.svg'
import { Info } from './Info'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectActiveCycleId,
  selectActiveTaskId,
  selectNumberOfPreviousCycles,
} from '../redux/reducers/cycleSlice'
import {
  selectActiveTodoByTaskId,
  selectInfo,
} from '../redux/reducers/todoSlice'
import { reducerStateType } from '../redux/store'

export function Header() {
  const info = useSelector(selectInfo)
  const numberOfPreviousCycles = useSelector(selectNumberOfPreviousCycles)
  const activeTaskId = useSelector(selectActiveTaskId)
  const activeTodo = useSelector((state: reducerStateType) =>
    selectActiveTodoByTaskId(state, activeTaskId),
  )
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <ul className={styles.headerMenu}>
          <li>
            {' '}
            <NavLink to="/">
              <img src={todoLogo} alt="TOTO logo" />
            </NavLink>
          </li>
          <li>
            {' '}
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            {' '}
            <NavLink to="/blog">Blog (React Context)</NavLink>
          </li>
          <li>
            {' '}
            <NavLink to="/redux/blog">Blog (Redux AsyncThunk)</NavLink>
          </li>
        </ul>

        <div className={styles.infoContainer}>
          <Info
            title="Todos"
            amount={`${info.totalCompleted} of ${info.total}`}
            numberHighlight={
              (info.totalCompleted === info.total && info.total > 0) || false
            }
          />
          <Info
            title="Tasks"
            amount={`${info.totalTasksCompleted} of ${info.totalTasks}`}
            purple
            numberHighlight={
              (info.totalTasksCompleted === info.totalTasks &&
                info.totalTasks > 0) ||
              false
            }
          />
          <Info title="Cycles" amount={`${numberOfPreviousCycles}`} />
          {activeTodo && (
            <NavLink to={`/todo/${activeTodo.slug}`}>
              <Info
                blink
                purple
                numberHighlight
                title="In progress"
                amount={`1`}
              />
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
