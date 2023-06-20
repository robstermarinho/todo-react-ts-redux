import styles from "./App.module.css";

import { Header } from "./components/Header";
import { FormInput } from "./components/FormInput";
function App() {
  return (
    <div>
      <Header />
      <div className={styles.body}>
        <FormInput />
      </div>
    </div>
  );
}

export default App;
