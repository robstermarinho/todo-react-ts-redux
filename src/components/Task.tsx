import { useState } from "react";
import styles from "./Task.module.css";
import { Trash, CheckCircle, Circle } from "phosphor-react";
export function Task() {
  const [isDone, setIsDone] = useState(true);

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

      <a onClick={handleCheckChange}>Complete challenge</a>

      <button type="button">
        <Trash size={20} />
      </button>
    </div>
  );
}
