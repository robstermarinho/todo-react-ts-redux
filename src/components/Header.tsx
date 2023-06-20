import styles from "./Header.module.css";
import igniteLogo from "../assets/todo-logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="Logotipo do Ignite" />
    </header>
  );
}
