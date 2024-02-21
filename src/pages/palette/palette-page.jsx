import { Palette } from 'components/palette/palette'
import styles from './palette-page.module.css'


export const PalletePage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.header}>Palette</h2>
      <Palette/>
    </div>
  )
}