import { createEvent, createStore, sample } from 'effector' 


export const $colors = createStore({})
export const $maxColorId = $colors.map((colors) => {
  const ids = Object.keys(colors)
  if (ids.length === 0) return 0
  return Number(ids.at(-1))
})

export const addColor = createEvent()
sample({
  clock: addColor,
  source: $colors,
  filter: (colors, {id}) => !colors[id],
  fn: (colors, {id, color}) => {
    return {...colors, [id]: color}
  },
  target: $colors
})

export const editColor = createEvent()
sample({
  clock: editColor,
  source: $colors,
  filter: (colors, {id}) => !!colors[id],
  fn: (colors, {id, newData}) => {
    return {
      ...colors,
      [id]: newData
    }
  },
  target: $colors
})

export const deleteColor = createEvent()
sample({
  clock: deleteColor,
  source: $colors,
  filter: (colors, id) => !!colors[id],
  fn: (colors, id) => {
    const newColors = {...colors}
    delete newColors[id]
    return newColors
  },
  target: $colors
})
