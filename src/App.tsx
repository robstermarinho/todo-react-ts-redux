import styles from "./App.module.css";

import { Header } from "./components/Header";
import { FormInput } from "./components/FormInput";
import { Info } from "./components/Info";
function App() {
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
        </div>
      </div>
    </div>
  );
}

export default App;
