import { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { v4 as uid } from "uuid";
import styles from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/Header";
import { FormInput } from "./components/FormInput";
import { Info } from "./components/Info";
import { Task, EmptyTask, TasksHeader } from "./components/Task";
import { TaskType } from "./components/Task";
import { storeInStorage, getFromStorage } from "./helper/storage";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(
    getFromStorage({ key: "tasks" }) || []
  );

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

  const sortTasks = (taskA: TaskType, taskB: TaskType) => {
    if (taskA.isDone && !taskB.isDone) {
      return 1;
    }
    if (!taskA.isDone && taskB.isDone) {
      return -1;
    }
    return 0;
  };

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: uid(),
      title,
      isDone: false,
      date: new Date(),
    };

    setTasks((prevTasks) => {
      const finalResult = [...prevTasks, newTask].sort(sortTasks);

      storeInStorage({ key: "tasks", value: finalResult });

      return finalResult;
    });

    toast.success("Task added successfully!");
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => {
      const finalResult = prevTasks
        .filter((task) => task.id !== id)
        .sort(sortTasks);

      storeInStorage({ key: "tasks", value: finalResult });

      return finalResult;
    });
    toast.success("Task removed successfully!");
  };

  const toggleTaskState = (id: string) => {
    setTasks((prevTasks) => {
      const finalResult = prevTasks
        .map((task) => {
          if (task.id === id) {
            return { ...task, isDone: !task.isDone, date: new Date() };
          }
          return task;
        })
        .sort(sortTasks);

      storeInStorage({ key: "tasks", value: finalResult });
      return finalResult;
    });
  };

  const renderTasks = () => {
    if (tasks.length == 0) {
      return <EmptyTask />;
    }

    return (
      <AnimatePresence>
        <TasksHeader
          key={"task-header"}
          selectAll={setAllTasksisDoneWithState}
          removeAll={removeAllTasks}
        />
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            removeTask={removeTask}
            toggleTaskState={toggleTaskState}
          />
        ))}
      </AnimatePresence>
    );
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
