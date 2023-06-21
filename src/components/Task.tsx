import { useState, useEffect } from "react";
import styles from "./Task.module.css";
import { Trash, CheckCircle, Circle } from "phosphor-react";
import clipBoardIcon from "../assets/clipboard-icon.svg";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

interface TaskProps {
  task: TaskType;
  removeTask: (id: string) => void;
}

interface TasksHeaderProps {
  selectAll: (nextState: boolean) => void;
  removeAll: () => void;
}

export function Task({ task, removeTask }: TaskProps) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setIsDone(task.isDone);
  }, [task.isDone]);

  const handleCheckChange = () => {
    setIsDone((prevState) => !prevState);
  };
  const handleRemoveTask = (taskID: string) => {
    removeTask(taskID);
  };
  return (
    <div
      className={`${styles.todoItem} ${
        isDone ? styles.checkboxChecked : styles.checkboxDefault
      }`}
    >
      <div className={`${styles.checkboxContainer}`}>
        {isDone && <CheckCircle size={22} weight="fill" />}
        {!isDone && <Circle size={22} weight="duotone" />}
        <input checked={isDone} onChange={handleCheckChange} type="checkbox" />
      </div>

      <a onClick={handleCheckChange}>{task.title}</a>

      <button onClick={() => handleRemoveTask(task.id)} type="button">
        <Trash size={20} />
      </button>
    </div>
  );
}

export function TasksHeader({ selectAll, removeAll }: TasksHeaderProps) {
  const [isDone, setIsDone] = useState(false);

  const handleSelectAllChange = () => {
    setIsDone((prevState) => {
      return !prevState;
    });
    selectAll(!isDone);
  };
  const handleRemoveAll = () => {
    removeAll();
  };
  return (
    <div
      className={`${styles.todoItem} ${styles.todoItemHeader} ${
        isDone ? styles.checkboxChecked : styles.checkboxDefault
      }`}
    >
      <div className={`${styles.checkboxContainer}`}>
        {isDone && <CheckCircle size={22} weight="fill" />}
        {!isDone && <Circle size={22} weight="duotone" />}
        <input
          title="Select All Tasks"
          checked={isDone}
          onChange={handleSelectAllChange}
          type="checkbox"
        />
      </div>
      <a></a>
      <button title="Remove All Tasks" onClick={handleRemoveAll} type="button">
        <Trash size={20} />
      </button>
    </div>
  );
}

export function EmptyTask() {
  return (
    <div className={styles.emptyTask}>
      <div className={styles.emptyTaskContent}>
        <img src={clipBoardIcon} alt="Clipboard icon" />
        <h3>You don't have any tasks registered yet</h3>
        <p>Create tasks and organize your to-do items.</p>
      </div>
    </div>
  );
}
