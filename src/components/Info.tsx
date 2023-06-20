import styles from "./Info.module.css";

interface InfoProps {
  title: string;
  amount: string;
  purple?: boolean;
}

export function Info({ title, amount, purple }: InfoProps) {
  return (
    <div className={styles.todoHeader}>
      <h5 className={purple ? styles.purple : styles.blue}>{title}</h5>{" "}
      <span>{amount}</span>
    </div>
  );
}
