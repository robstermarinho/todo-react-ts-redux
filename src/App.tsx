import { useState } from "react";
import styles from "./App.module.css";

import { Header } from "./components/Header";
import { FormInput } from "./components/FormInput";
import { Info } from "./components/Info";
import { Task } from "./components/Task";
function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete challenge",
      isDone: false,
    },
    {
      id: 2,
      title: "Watch Ignite's classes",
      isDone: true,
    },
  ]);
  return (
    <div>
      <Header />
      <div className={styles.body}>
        <div className={styles.container}>
          <FormInput />
          <div className={styles.todoHeaderContainer}>
            <Info title="Tasks" amount="2" />
            <Info title="Done" amount="2 of 4" purple />
          </div>
          <div className={styles.todoListContainer}>
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
