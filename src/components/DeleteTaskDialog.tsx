import { useState } from "react";
import styles from "./DeleteTaskDialog.module.css";
import { Trash } from "phosphor-react";
interface DeleteTaskDialogProps {
  onSuccess: () => void;
  title: string;
  targetName?: string;
  question: string;
  cancel_text?: string;
  confirm_text?: string;
}

export function DeleteTaskDialog({
  onSuccess,
  title,
  targetName,
  question,
  cancel_text,
  confirm_text,
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
            <h2>{title}</h2>
            {targetName && <h4>{targetName}</h4>}
            <p>{question}</p>
            <div className={styles.buttonsContainer}>
              <button onClick={toggleModal} className={styles.modalCancel}>
                {cancel_text ? cancel_text : "Cancel"}
              </button>
              <button onClick={confirmAction} className={styles.modalConfirm}>
                {confirm_text ? confirm_text : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
