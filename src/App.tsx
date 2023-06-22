import { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";

import { v4 as uid } from "uuid";
import styles from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/Header";
import { FormInput } from "./components/FormInput";
import { Info } from "./components/Info";
import { Task, EmptyTask, TasksHeader } from "./components/Task";
import { TaskType } from "./components/Task";

// Initial tasks
const initialTasks: TaskType[] = [];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const setAllTasksisDoneWithState = (state: boolean) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => ({ ...task, isDone: state }));
    });
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  const numberOfTasks = useMemo((): string => {
    return `${tasks.length}`;
  }, [tasks]);

  const numberOfDoneTasks = useMemo((): string => {
    let doneTasks = tasks.filter((task) => task.isDone);
    return `${doneTasks.length} of ${numberOfTasks}`;
  }, [tasks]);

  const renderTasks = () => {
    if (tasks.length === 0) {
      return <EmptyTask />;
    }

    let taskList = tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        removeTask={removeTask}
        toggleTaskState={toggleTaskState}
      />
    ));

    taskList.unshift(
      <TasksHeader
        key={"task-header"}
        selectAll={setAllTasksisDoneWithState}
        removeAll={removeAllTasks}
      />
    );

    return taskList;
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

  const toggleTaskState = (id: string) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });
    });
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
      <ToastContainer theme="dark" closeOnClick />
    </div>
  );
}

export default App;
