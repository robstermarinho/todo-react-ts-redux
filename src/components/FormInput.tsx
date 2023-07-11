import { useState } from 'react'
import styles from './FormInput.module.css'
import { PlusCircle } from 'phosphor-react'
import { toast } from 'react-toastify'

interface FormInputProps {
  addAction: (title: string) => void
  placeholder?: string
  inactive?: boolean
}

export function FormInput({
  addAction,
  placeholder,
  inactive = false,
}: FormInputProps) {
  const [title, setTitle] = useState('')
  const [hasError, setHasError] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inactive) return
    if (title.trim() === '') {
      toast.error('Please, enter a valid task title.')
      setHasError(true)
      return
    }
    setHasError(false)
    addAction(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleInputSubmit} className={styles.inputContainer}>
      <input
        disabled={inactive}
        onFocus={() => setHasError(false)}
        onChange={handleInputChange}
        value={title}
        type="text"
        placeholder={placeholder || 'Add new item'}
        className={hasError ? styles.inputError : ''}
      />
      <button type="submit" disabled={inactive}>
        <span>Add</span>
        <PlusCircle size={16} weight="bold" />
      </button>
    </form>
  )
}
