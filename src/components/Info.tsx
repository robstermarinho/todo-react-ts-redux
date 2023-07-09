import styles from './Info.module.css'

interface InfoProps {
  title?: string
  amount: string
  purple?: boolean
  numberHighlight?: boolean
}

export function Info({
  title,
  amount,
  purple,
  numberHighlight = false,
}: InfoProps) {
  return (
    <div className={styles.todoHeader}>
      {title && (
        <h5 className={purple ? styles.purple : styles.blue}>{title}</h5>
      )}
      <span className={numberHighlight ? styles.numberHighlight : ''}>
        {amount}
      </span>
    </div>
  )
}
