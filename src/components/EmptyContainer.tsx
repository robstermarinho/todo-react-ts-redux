import clipBoardIcon from '../assets/clipboard-icon.svg'
import { motion } from 'framer-motion'
import styles from './EmptyContainer.module.css'
import React from 'react'

interface EmptyContainerProps {
  title: string
  subTitle: string
  button?: React.ReactNode | null
}
export function EmptyContainer({
  title,
  subTitle,
  button = null,
}: EmptyContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={styles.emptyTask}
    >
      <div className={styles.emptyTaskContent}>
        <img src={clipBoardIcon} alt="Clipboard icon" />
        <h3>{title}</h3>
        <p>{subTitle}</p>
        {button}
      </div>
    </motion.div>
  )
}
