import React from 'react'
import styles from './Separator.module.css'

interface SeparatorProps {
  color?: string
}

const Separator: React.FC<SeparatorProps> = ({ color }) => {
  return (
    <div
      className={styles.separator}
      style={color ? { backgroundColor: color } : undefined}
    />
  )
}

export default Separator
