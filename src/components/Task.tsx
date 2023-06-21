import { useState } from "react";
import styles from "./Task.module.css";
import { Trash, CheckCircle, Circle } from "phosphor-react";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

interface TaskProps {
  task: TaskType;
}

export function Task({ task }: TaskProps) {
  const [isDone, setIsDone] = useState(task.isDone);

  const handleCheckChange = () => {
    setIsDone((prevState) => !prevState);
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

      <button type="button">
        <Trash size={20} />
      </button>
    </div>
  );
}
