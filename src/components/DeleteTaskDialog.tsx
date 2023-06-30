import { useState } from 'react'
import styles from './DeleteTaskDialog.module.css'
import { Trash } from 'phosphor-react'
interface DeleteTaskDialogProps {
  onSuccess: () => void
  title: string
  targetName?: string
  question: string
  cancelText?: string
  confirmText?: string
  buttonLabel?: string
}

export function DeleteTaskDialog({
  onSuccess,
  title,
  targetName,
  question,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  buttonLabel = '',
}: DeleteTaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  function toggleModal() {
    setIsOpen((prevState) => !prevState)
  }

  function confirmAction() {
    onSuccess()
    toggleModal()
  }
  return (
    <>
      <button className="dialog-remove-button" onClick={() => toggleModal()}>
        <Trash size={20} />{' '}
        {buttonLabel.length > 0 && <span>{buttonLabel}</span>}
      </button>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <h2>{title}</h2>
            {targetName && <h4>{targetName}</h4>}
            <p>{question}</p>
            <div className={styles.buttonsContainer}>
              <button onClick={toggleModal} className={styles.modalCancel}>
                {cancelText || 'Cancel'}
              </button>
              <button onClick={confirmAction} className={styles.modalConfirm}>
                {confirmText || 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
