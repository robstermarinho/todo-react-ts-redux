import styles from './Header.module.css'
import todoLogo from '../assets/todo-logo.svg'
import { AppInfoContext } from '../helper/context'
import { useContext } from 'react'
import { Info } from './Info'

export function Header() {
  const { info } = useContext(AppInfoContext)

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <img src={todoLogo} alt="TOTO logo" />
        <div className={styles.infoContainer}>
          <Info
            title="All Todos"
            amount={`${info.totalCompleted} of ${info.total}`}
          />
          <Info
            title="All Tasks"
            amount={`${info.totalTasksCompleted} of ${info.totalTasks}`}
            purple
          />
        </div>
      </div>
    </header>
  )
}
