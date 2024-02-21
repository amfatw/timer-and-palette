import { useState } from 'react'
import { useUnit } from 'effector-react'

import { $timeLeft, $timeToTrack, startTimer } from './model'
import styles from './timer.module.css'
import {config} from './config'
import { getTimeStringFromMs } from 'utils/getTimeStringFromMs'
import { getMsFromMinutes } from 'utils/getMsFromMinutes'


export const Timer = () => {
  const [value, setValue] = useState('')

  const timeLeftInMs = useUnit($timeLeft)
  let textToDisplay = ''
  if (timeLeftInMs < 0) textToDisplay = 'Готово'
  if (timeLeftInMs > 0) textToDisplay = getTimeStringFromMs(timeLeftInMs)
  
  const start = useUnit(startTimer)
  const handleSubmit = (e) => {
    e.preventDefault()
    start(getMsFromMinutes(value))
    setValue('')
  }

  const timeToTrack = useUnit($timeToTrack)

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="number"
          min={config.MIN_VALUE}
          max={config.MAX_VALUE}
          disabled={timeToTrack !== null}        
          autoFocus
          className={styles.input}
        />
      </form>
      <p className={styles.text}>
        {textToDisplay}</p>
    </div>
  )
}