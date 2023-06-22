import { useState } from "react";
import styles from "./Task.module.css";
import { Trash, CheckCircle, Circle } from "phosphor-react";
import clipBoardIcon from "../assets/clipboard-icon.svg";
import { motion } from "framer-motion";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

interface TaskProps {
  task: TaskType;
  removeTask: (id: string) => void;
  toggleTaskState: (id: string) => void;
}

interface TasksHeaderProps {
  selectAll: (nextState: boolean) => void;
  removeAll: () => void;
}
const motionVariants = {
  initial: {
    opacity: 0,
    translateY: -100,
  },
  animate: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: { opacity: 0, translateX: -100 },
};

export function Task({ task, removeTask, toggleTaskState }: TaskProps) {
  const handleCheckChange = (taskID: string) => {
    toggleTaskState(taskID);
  };

  const handleRemoveTask = (taskID: string) => {
    removeTask(taskID);
  };

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

      <button onClick={() => handleRemoveTask(task.id)} type="button">
        <Trash size={20} />
      </button>
    </motion.div>
  );
}

export function TasksHeader({ selectAll, removeAll }: TasksHeaderProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectAllChange = () => {
    setIsSelected((prevState) => {
      return !prevState;
    });
    selectAll(!isSelected);
  };

  const handleRemoveAll = () => {
    removeAll();
  };

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
      <a></a>
      <button title="Remove All Tasks" onClick={handleRemoveAll} type="button">
        <Trash size={20} />
      </button>
    </motion.div>
  );
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
  );
}
