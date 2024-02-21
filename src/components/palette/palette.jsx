import { useState } from 'react'
import { useUnit } from 'effector-react'

import styles from './palette.module.css'
import { COLOR_OPTIONS, DEFAULT_COLOR } from './config'
import { $colors, editColor, deleteColor, addColor, $maxColorId } from './model'
import { ClickableColor } from 'components/clickable-color/clickable-color'


export const Palette = () => {
  const [idToEdit, setIdToEdit] = useState(null)

  const colors = useUnit($colors)
  const maxId = useUnit($maxColorId)
  const add = useUnit(addColor)
  const edit = useUnit(editColor)
  const del = useUnit(deleteColor)

  const handleAdd = () => {
    const newId = maxId + 1
    add({
      id: newId,
      color: DEFAULT_COLOR
    })
    setIdToEdit(newId)
  }

  const handleEdit = (color) => {
    edit({
      id: idToEdit,
      newData: color
    })
    setIdToEdit(null)
  }

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setIdToEdit(null)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Palette</p>
        <button onClick={handleAdd}>+ add</button>
      </div>

      <ul className={styles.list}>
        {Object.keys(colors).map((id) => {
          const color = colors[id]

          return (
            <li key={id} className={styles.item}>
              <ClickableColor
                color={color}
                clickHandler={() => setIdToEdit(id)}
                deleteHandler={() => del(id)}
              />
            </li>
          )
        })}
      </ul>

      {idToEdit && (
        <div
          onClick={handleBackgroundClick}
          className={styles.pickerBackground}
        >
          <div className={styles.pickerContainer}>
            <p className={styles.pickerTitle}>edit color: {idToEdit}</p>
            <ul className={styles.pickerList}>
              {COLOR_OPTIONS.map((color) => (
                <ClickableColor
                key={color.name}
                color={color}
                clickHandler={() => handleEdit(color)}
                />
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}