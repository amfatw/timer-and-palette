import { Timer } from 'components/timer/timer'
import styles from './timer-page.module.css'


export const TimerPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.header}>Timer</h2>
      <Timer/>
    </div>
  )
}