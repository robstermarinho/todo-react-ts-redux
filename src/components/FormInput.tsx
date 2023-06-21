import { useState } from "react";
import styles from "./FormInput.module.css";
import { PlusCircle } from "phosphor-react";
import { toast } from "react-toastify";

interface FormInputProps {
  addTask: (title: string) => void;
}

export function FormInput({ addTask }: FormInputProps) {
  const [title, setTitle] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() === "") {
      toast.error("Please, enter a valid task title.");
      setHasError(true);
      return;
    }
    setHasError(false);
    addTask(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleInputSubmit} className={styles.inputContainer}>
      <input
        onFocus={() => setHasError(false)}
        onChange={handleInputChange}
        value={title}
        type="text"
        placeholder="Add new todo"
        className={hasError ? styles.inputError : ""}
      />
      <button type="submit">
        <span>Add</span>
        <PlusCircle size={16} weight="bold" />
      </button>
    </form>
  );
}
