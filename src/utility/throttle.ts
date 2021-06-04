export const throttle = (callback: () => void, wait: number, immediate = false) => {
  let timeout: NodeJS.Timeout | null = null
  let initialCall = true

  return () => {
    const callNow = immediate && initialCall
    const next = () => {
      callback()
      timeout = null
    }

    if (callNow) {
      initialCall = false
      next()
    }

    if (!timeout) {
      timeout = setTimeout(next, wait)
    }
  }
}
