import styles from './Header.module.css'
import todoLogo from '../assets/todo-logo.svg'
import { Info } from './Info'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectActiveCycleId,
  selectNumberOfPreviousCycles,
} from '../redux/reducers/cycleSlice'
import { selectInfo } from '../redux/reducers/todoSlice'

export function Header() {
  const info = useSelector(selectInfo)
  const numberOfPreviousCycles = useSelector(selectNumberOfPreviousCycles)
  const activeCycleId = useSelector(selectActiveCycleId)

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
            <NavLink to="/blog">Blog</NavLink>
          </li>
        </ul>

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
