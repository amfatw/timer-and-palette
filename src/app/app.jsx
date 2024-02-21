import { Routes, Route, Navigate } from 'react-router-dom'

import { Navigation } from 'components/navigation/navigation'
import { TimerPage } from 'pages/timer/timer-page'
import { PalletePage } from 'pages/pallete/pallete-page'
import styles from './app.module.css'


export const App = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.pageContainer}>
      <Routes>
        <Route path='/timer' element={<TimerPage/>}/>
        <Route path='/pallete' element={<PalletePage/>}/>
        <Route path='*' element={<Navigate to='/timer'/>}/>
      </Routes>
      </div>
      
      <Navigation/>
    </div>
  )
}
