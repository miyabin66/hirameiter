import { useEffect, useState } from 'react'

export const useHasTouchScreen = (): { hasTouchScreen: boolean } => {
  const [hasTouchScreen, setHasTouchScreen] = useState<boolean>(false)

  useEffect(() => {
    const isFlag = () => {
      if (navigator.maxTouchPoints > 0) {
        return true
      }
      if (window.matchMedia('(pointer:coarse)').matches) {
        return true
      }
      if ('orientation' in window) {
        return true
      }
      return false
    }
    setHasTouchScreen(isFlag)
  }, [])

  return {
    hasTouchScreen,
  }
}
