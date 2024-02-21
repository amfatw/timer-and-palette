import styles from './clickable-color.module.css'


export const ClickableColor = ({color, clickHandler, deleteHandler}) => {
  return (
    <div className={styles.container}>
      <button
        style={{ backgroundColor: color.hex }}
        onClick={clickHandler}
        aria-label={color.name}
        className={styles.colorButton}
      />

      {deleteHandler && (
        <button
          onClick={deleteHandler}
          aria-label={`delete ${color.name}`}
          className={styles.deleteButton}
        >
          x
        </button>
      )}
    </div>
  )
}

