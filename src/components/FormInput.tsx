import styles from "./FormInput.module.css";
import addImg from "../assets/add.svg";

export function FormInput() {
  return (
    <div className={styles.inputContainer}>
      <input type="text" placeholder="Adicionar novo todo" />
      <button type="submit">
        <label>Add</label>
        <img src={addImg} alt="Adicionar todo" />
      </button>
    </div>
  );
}
