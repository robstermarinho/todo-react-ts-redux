import styles from './ConfirmDialog.module.css'
import { Trash, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

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
  disabled?: boolean
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
  disabled = false,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button disabled={disabled} className={styles.dialogConfirmButton}>
          {btnIcon}{' '}
          {buttonLabel && (
            <span className={styles.buttonLabel}>{buttonLabel}</span>
          )}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.AlertDialogOverlay} />
        <Dialog.Content
          className={`${styles.AlertDialogContent} ${big ? styles.big : ''}`}
        >
          <Dialog.Title className={styles.AlertDialogTitle}>
            {title}
          </Dialog.Title>
          <Dialog.Close className={styles.AlertDialogClose}>
            <X />
          </Dialog.Close>

          <Dialog.Content className={styles.AlertDialogDescription}>
            {targetName && <h4>{targetName}</h4>}
            {question && <p>{question}</p>}
            {body}
          </Dialog.Content>
          <div className={styles.buttonsContainer}>
            <Dialog.Close asChild>
              <button className={styles.modalCancel}>
                {cancelText || 'Cancel'}
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              {showConfirmButton && (
                <button onClick={onSuccess} className={styles.modalConfirm}>
                  {confirmText || 'Confirm'}
                </button>
              )}
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
