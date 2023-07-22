import styles from './ConfirmDialog.module.css'
import { Trash } from 'phosphor-react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

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
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className={styles.dialogConfirmButton}>
          {btnIcon}{' '}
          {buttonLabel && (
            <span className={styles.buttonLabel}>{buttonLabel}</span>
          )}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
        <AlertDialog.Content
          className={`${styles.AlertDialogContent} ${big ? styles.big : ''}`}
        >
          <AlertDialog.Title className={styles.AlertDialogTitle}>
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.AlertDialogDescription}>
            {targetName && <h4>{targetName}</h4>}
            <p>{question}</p>
            {body}
          </AlertDialog.Description>
          <div className={styles.buttonsContainer}>
            <AlertDialog.Cancel asChild>
              <button className={styles.modalCancel}>
                {cancelText || 'Cancel'}
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              {showConfirmButton && (
                <button onClick={onSuccess} className={styles.modalConfirm}>
                  {confirmText || 'Confirm'}
                </button>
              )}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
