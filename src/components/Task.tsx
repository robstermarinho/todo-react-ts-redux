import { useState } from 'react'
import styles from './Task.module.css'
import { CheckCircle, Circle } from 'phosphor-react'
import clipBoardIcon from '../assets/clipboard-icon.svg'
import { motion } from 'framer-motion'
import { DeleteTaskDialog } from './DeleteTaskDialog'
import { motionVariants } from '../helper/variants'

export interface TaskType {
  id: string
  title: string
  isDone: boolean
  date: Date
}

interface TaskProps {
  task: TaskType
  removeTask: (id: string) => void
  toggleTaskState: (id: string) => void
}

interface TasksHeaderProps {
  selectAll: (nextState: boolean) => void
  removeAll: () => void
}

export function Task({ task, removeTask, toggleTaskState }: TaskProps) {
  const handleCheckChange = (taskID: string) => {
    toggleTaskState(taskID)
  }

  const handleRemoveTask = (taskID: string) => {
    removeTask(taskID)
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      variants={motionVariants}
      className={`${styles.todoItem} ${
        task.isDone ? styles.checkboxChecked : styles.checkboxDefault
      }`}
    >
      <div className={`${styles.checkboxContainer}`}>
        {task.isDone && <CheckCircle size={22} weight="fill" />}
        {!task.isDone && <Circle size={22} weight="duotone" />}
        <input
          checked={task.isDone}
          onChange={() => handleCheckChange(task.id)}
          type="checkbox"
        />
      </div>

      <a onClick={() => handleCheckChange(task.id)}>{task.title}</a>
      <small>
        {new Date(task.date).toLocaleDateString()}{' '}
        {new Date(task.date).toLocaleTimeString()}
      </small>
      <DeleteTaskDialog
        onSuccess={() => handleRemoveTask(task.id)}
        title="Remove Task"
        question="Are you sure you want to remove this task?"
        targetName={task.title}
        confirmText="Remove Task"
      />
    </motion.div>
  )
}

export function TasksHeader({ selectAll, removeAll }: TasksHeaderProps) {
  const [isSelected, setIsSelected] = useState(false)

  const handleSelectAllChange = () => {
    setIsSelected((prevState) => {
      return !prevState
    })
    selectAll(!isSelected)
  }

  const handleRemoveAll = () => {
    removeAll()
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      variants={motionVariants}
      className={`${styles.todoItem} ${styles.todoItemHeader} ${
        isSelected ? styles.checkboxChecked : styles.checkboxDefault
      }`}
    >
      <div className={`${styles.checkboxContainer}`}>
        {isSelected && <CheckCircle size={22} weight="fill" />}
        {!isSelected && <Circle size={22} weight="duotone" />}
        <input
          title="Select All Tasks"
          checked={isSelected}
          onChange={handleSelectAllChange}
          type="checkbox"
        />
      </div>

      <DeleteTaskDialog
        onSuccess={handleRemoveAll}
        title="Remove All Tasks"
        question="Are you sure you want to remove all tasks?"
        confirmText="Remove All"
      />
    </motion.div>
  )
}

export function EmptyTask() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={styles.emptyTask}
    >
      <div className={styles.emptyTaskContent}>
        <img src={clipBoardIcon} alt="Clipboard icon" />
        <h3>You don't have any tasks registered yet</h3>
        <p>Create tasks and organize your to-do items.</p>
      </div>
    </motion.div>
  )
}
