import { useState, useMemo } from "react";
import { v4 as uid } from "uuid";
import styles from "./App.module.css";

import { Header } from "./components/Header";
import { FormInput } from "./components/FormInput";
import { Info } from "./components/Info";
import { Task } from "./components/Task";
import { TaskType } from "./components/Task";

// Initial tasks
const initialTasks: TaskType[] = [
  {
    id: uid(),
    title: "Complete challenge",
    isDone: false,
  },
  {
    id: uid(),
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    isDone: false,
  },
  {
    id: uid(),
    title: "Lorem dolor sit amet consectetur adipisicing elit.",
    isDone: true,
  },
  {
    id: uid(),
    title: "Lorem amet consectetur adipisicing elit.",
    isDone: true,
  },
  {
    id: uid(),
    title: "Lorem sit amet consectetur adipisicing elit.",
    isDone: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const numberOfTasks = useMemo((): string => {
    return `${tasks.length}`;
  }, [tasks]);

  const numberOfDoneTasks = useMemo((): string => {
    let doneTasks = tasks.filter((task) => task.isDone);
    return `${doneTasks.length} of ${tasks.length}`;
  }, [tasks]);

  return (
    <div>
      <Header />
      <div className={styles.body}>
        <div className={styles.container}>
          <FormInput />
          <div className={styles.todoHeaderContainer}>
            <Info title="Tasks" amount={numberOfTasks} />
            <Info title="Done" amount={numberOfDoneTasks} purple />
          </div>
          <div className={styles.todoListContainer}>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
