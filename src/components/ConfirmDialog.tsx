import { useState } from 'react'
import styles from './ConfirmDialog.module.css'
import { Trash } from 'phosphor-react'
interface ConfirmDialogProps {
  onSuccess: () => void
  title: string
  targetName?: string
  question: string
  cancelText?: string
  confirmText?: string
  buttonLabel?: string | React.ReactNode
  body?: React.ReactNode
  showConfirmButton?: boolean
  btnIcon?: React.ReactNode
  big?: boolean
}

export function ConfirmDialog({
  onSuccess,
  title,
  targetName,
  question,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  buttonLabel = '',
  body = null,
  showConfirmButton = true,
  btnIcon = <Trash size={20} />,
  big = false,
}: ConfirmDialogProps) {
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
      <button
        className={styles.dialogConfirmButton}
        onClick={() => toggleModal()}
      >
        {btnIcon}{' '}
        {buttonLabel && (
          <span className={styles.buttonLabel}>{buttonLabel}</span>
        )}
      </button>

      {isOpen && (
        <div className={styles.container}>
          <div className={`${styles.modal} ${big ? styles.big : ''}`}>
            <h2>{title}</h2>
            {targetName && <h4>{targetName}</h4>}
            <p>{question}</p>
            {body}
            <div className={styles.buttonsContainer}>
              <button onClick={toggleModal} className={styles.modalCancel}>
                {cancelText || 'Cancel'}
              </button>
              {showConfirmButton && (
                <button onClick={confirmAction} className={styles.modalConfirm}>
                  {confirmText || 'Confirm'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
