import {Link as RouterLink} from 'react-router-dom'

import styles from './link.module.css'


export const Link = ({name, to, isCurrent}) => {
  return (
    <RouterLink
      to={isCurrent ? null : to}
      className={`${styles.link} ${isCurrent ? styles.disabledLink : ''}`}
    >
      {name}
    </RouterLink>
  )
}