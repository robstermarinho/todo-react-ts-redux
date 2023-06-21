import styles from "./FormInput.module.css";
import { PlusCircle } from "phosphor-react";
export function FormInput() {
  return (
    <div className={styles.inputContainer}>
      <input type="text" placeholder="Add new todo" />
      <button type="submit">
        <label>Add</label>
        <PlusCircle size={16} weight="bold" />
      </button>
    </div>
  );
}
