import { useLocation } from 'react-router-dom'

import { Link } from 'components/link/link'
import styles from './navigation.module.css'


export const Navigation = () => {
  const {pathname} = useLocation()

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li>
          <Link
            name='Timer'
            to='/timer'
            isCurrent={pathname === '/timer'}
          />
        </li>

        <li>
          <Link
            name='Palette'
            to='/palette'
            isCurrent={pathname === '/palette'}
          />
        </li>
      </ul>
    </nav>
  )
}