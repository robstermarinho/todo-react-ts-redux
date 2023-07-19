import { useState } from 'react'
import styles from './Task.module.css'
import { CheckCircle, Circle, Clock } from 'phosphor-react'
import { motion } from 'framer-motion'
import { ConfirmDialog } from './ConfirmDialog'
import { motionVariants } from '../helper/variants'
import { formatDistanceToNow, fromUnixTime } from 'date-fns'
import { TaskProps, TasksHeaderProps } from '../@types/todo'
import { useSelector } from 'react-redux'
import { reducerStateType } from '../redux/store'
import { Countdown } from '../pages/CyclePage/Components/Countdown/count-down'
import { toast } from 'react-toastify'

export function Task({ task, removeTask, toggleTaskState }: TaskProps) {
  const isTaskInActiveCycle = useSelector((state: reducerStateType) => {
    return state.cycles.activeTaskId === task.id
  })

  const taskCycles = useSelector((state: reducerStateType) => {
    return state.cycles.cycles.filter((cycle) => cycle.taskId === task.id)
  })

  const handleCheckChange = (taskID: string) => {
    if (isTaskInActiveCycle) {
      toast.error('You cannot change the state of a task in an active cycle.')
      return
    }
    toggleTaskState(taskID)
  }

  const handleRemoveTask = (taskID: string) => {
    if (isTaskInActiveCycle) {
      toast.error('You cannot remove a task in an active cycle.')
      return
    }

    removeTask(taskID)
  }

  const renderTaskCycles = () => {
    return (
      taskCycles.length > 0 && (
        <div className={styles.taskCyclesContainer}>
          <table className={styles.taskCyclesTable}>
            <thead>
              <tr>
                <th>Duration</th>
                <th>Started At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {taskCycles.map((cycle) => {
                return (
                  <tr key={cycle.id}>
                    <td> {cycle.minutesAmount} minutes</td>
                    <td>
                      {formatDistanceToNow(new Date(cycle.startDate), {
                        addSuffix: true,
                      })}
                    </td>
                    <td>
                      {cycle.finishedDate && (
                        <div
                          className={`${styles.statusLabel} ${styles.completed}`}
                        >
                          Completed
                        </div>
                      )}

                      {cycle.interruptedDate && (
                        <div
                          className={`${styles.statusLabel} ${styles.interrupted}`}
                        >
                          Interrupted
                        </div>
                      )}
                      {!cycle.finishedDate && !cycle.interruptedDate && (
                        <div
                          className={`${styles.statusLabel} ${styles.working}`}
                        >
                          Working
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    )
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
      } ${isTaskInActiveCycle && styles.taskInActiveCycle}`}
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

      <a onClick={() => handleCheckChange(task.id)}>
        {task.title}
        {isTaskInActiveCycle && <Countdown isMinimal={true} />}
      </a>

      <small>
        {formatDistanceToNow(fromUnixTime(task.date), { addSuffix: true })}
      </small>
      {taskCycles.length > 0 && (
        <ConfirmDialog
          showConfirmButton={false}
          onSuccess={() => null}
          title={`Cycles History`}
          targetName={task.title}
          question=""
          cancelText="Close"
          buttonLabel={<span> {taskCycles.length} Cyles </span>}
          btnIcon={<Clock size={20} weight="duotone" />}
          body={renderTaskCycles()}
          big
        />
      )}
      <ConfirmDialog
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

      <ConfirmDialog
        onSuccess={handleRemoveAll}
        title="Remove All Tasks"
        question="Are you sure you want to remove all tasks?"
        confirmText="Remove All"
      />
    </motion.div>
  )
}
