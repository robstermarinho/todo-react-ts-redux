import { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";

import { v4 as uid } from "uuid";
import styles from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/Header";
import { FormInput } from "./components/FormInput";
import { Info } from "./components/Info";
import { Task, EmptyTask } from "./components/Task";
import { TaskType } from "./components/Task";

// Initial tasks
const initialTasks: TaskType[] = [
  // {
  //   id: uid(),
  //   title: "Complete challenge",
  //   isDone: false,
  // },
  // {
  //   id: uid(),
  //   title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //   isDone: false,
  // },
  // {
  //   id: uid(),
  //   title: "Lorem dolor sit amet consectetur adipisicing elit.",
  //   isDone: true,
  // },
  // {
  //   id: uid(),
  //   title: "Lorem amet consectetur adipisicing elit.",
  //   isDone: true,
  // },
  // {
  //   id: uid(),
  //   title: "Lorem sit amet consectetur adipisicing elit.",
  //   isDone: false,
  // },
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

  const renderTasks = () => {
    if (tasks.length === 0) {
      return <EmptyTask />;
    }
    return tasks.map((task) => (
      <Task key={task.id} task={task} removeTask={removeTask} />
    ));
  };

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: uid(),
      title,
      isDone: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success("Task added successfully!");
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task removed successfully!");
  };

  return (
    <div>
      <Header />
      <div className={styles.body}>
        <div className={styles.container}>
          <FormInput addTask={addTask} />
          <div className={styles.todoHeaderContainer}>
            <Info title="Tasks" amount={numberOfTasks} />
            <Info title="Done" amount={numberOfDoneTasks} purple />
          </div>
          <div className={styles.todoListContainer}>{renderTasks()}</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
