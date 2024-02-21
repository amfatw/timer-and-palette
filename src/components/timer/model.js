import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample
} from 'effector'


const $startTime = createStore(null)
const $currentTime = createStore(null)
export const $timeToTrack = createStore(null)

// оставшееся время высчитывается из времени начала, текущего и отслеживаемого.
// если таймер ещё не запускали, то это null. в остальных случаях число.
export const $timeLeft = combine({
  start: $startTime, 
  current: $currentTime, 
  track: $timeToTrack
}, ({start, current, track}) => {
  if (start === null || current === null) {
    return null
  }

  const passedTime = current - start
  const timeLeft = track - passedTime

  return timeLeft 
})

// при запуске таймера в стартовое и текущее время устанавливается текущее время,
// а в отслеживаемое - переданное из инпута
export const startTimer = createEvent()
sample({
  clock: startTimer,
  fn: () => Date.now(),
  target: [$startTime, $currentTime]
})
sample({
  clock: startTimer,
  target: $timeToTrack
})

const updateCurrentTimeWithDelayFx = createEffect(() => {
  return new Promise((res) => {
    setTimeout(() => {
      res(Date.now())
    }, 1000);
  })
})
sample({
  clock: updateCurrentTimeWithDelayFx.doneData,
  target: $currentTime
})
// при изменении текущего времени планируется новое обновление,
// если ещё есть время, которое надо отсчитывать
sample({
  clock: $currentTime,
  source: $timeToTrack,
  filter: (track) => track !== null,
  target: updateCurrentTimeWithDelayFx
})

// когда оставшееся время становится меньше 0,
// время для отслеживания сбрасывается, останавливая обновление таймера
sample({
  clock: $timeLeft,
  filter: (left) => left < 0,
  fn: () => null,
  target: $timeToTrack
})