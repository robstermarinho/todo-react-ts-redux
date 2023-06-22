import { useState } from "react";
import styles from "./DeleteTaskDialog.module.css";
import { Trash } from "phosphor-react";
interface DeleteTaskDialogProps {
  onSuccess: () => void;
  taskName: string;
}

export function DeleteTaskDialog({
  onSuccess,
  taskName,
}: DeleteTaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen((prevState) => !prevState);
  }

  function confirmAction() {
    onSuccess();
    toggleModal();
  }
  return (
    <>
      <button onClick={() => toggleModal()}>
        <Trash size={20} />
      </button>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <h2>Remove Task</h2>
            <h4>{taskName}</h4>
            <p>Are you sure you want to remove this task?</p>
            <div className={styles.buttonsContainer}>
              <button onClick={toggleModal} className={styles.modalCancel}>
                Cancel
              </button>
              <button onClick={confirmAction} className={styles.modalConfirm}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
