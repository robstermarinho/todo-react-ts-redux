import styles from './Header.module.css'
import todoLogo from '../assets/todo-logo.svg'
import { Info } from './Info'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectActiveTaskId,
  selectNumberOfPreviousCycles,
} from '../redux/reducers/cycleSlice'
import {
  selectActiveTodoByTaskId,
  selectInfo,
} from '../redux/reducers/todoSlice'
import { reducerStateType } from '../redux/store'
import gitHubIcon from '../assets/github.svg'
export function Header() {
  const info = useSelector(selectInfo)
  const numberOfPreviousCycles = useSelector(selectNumberOfPreviousCycles)
  const activeTaskId = useSelector(selectActiveTaskId)
  const activeTodo = useSelector((state: reducerStateType) =>
    selectActiveTodoByTaskId(state, activeTaskId),
  )

  return (
    <header className={styles.header}>
      <div className={styles.headerBadge}>
        <a
          href="https://github.com/robstermarinho/todo-react-ts-redux"
          target="_blank"
          title="Click here to access my repository"
          rel="noreferrer"
        >
          Open on Github
          <img
            src={gitHubIcon}
            alt=""
            width={20}
            height={20}
            style={{ marginLeft: '10px' }}
          />
        </a>
      </div>
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
            <NavLink to="/">
              {' '}
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            {' '}
            <NavLink to="/blog">
              <span>Blog</span>
              <small>API + React Context</small>
            </NavLink>
          </li>
          <li>
            {' '}
            <NavLink to="/redux/blog">
              <span>Blog</span>
              <small>API + Redux AsyncThunk</small>
            </NavLink>
          </li>
          <li>
            {' '}
            <NavLink to="/rtk/blog">
              <span>Blog</span>
              <small>API + RTK Query</small>
            </NavLink>
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
