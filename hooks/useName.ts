import {
  ChangeEvent,
  ChangeEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import split from 'graphemesplit'
import { useIndexContext } from '~/context/IndexContext'
import { Scene } from '~/interfaces/enums'

interface TypeReturn {
  isEmpty: boolean
  isOver: boolean
  isFirstEmpty: boolean
  nameInput: MutableRefObject<HTMLInputElement>
  saveName: () => void
  validation: (e: ChangeEvent<HTMLInputElement>) => void
}

const useName = (): TypeReturn => {
  const { isTopScene, setScene, setName, setIsTopScene } = useIndexContext()
  const nameInput = useRef<HTMLInputElement>(null)
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [isOver, setIsOver] = useState<boolean>(false)
  const [isFirstEmpty, setIsFirstEmpty] = useState<boolean>(true)

  useEffect(() => {
    if (isTopScene) {
      nameInput.current.value = ''
      setIsTopScene(false)
    }
  }, [isTopScene])

  const saveName = useCallback((): void => {
    setName(nameInput.current.value)
    setScene(Scene.background)
  }, [])

  const validation: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isFirstEmpty) {
        setIsFirstEmpty(false)
        return
      }
      if (!e.currentTarget.value) {
        setIsEmpty(true)
        return
      }
      if (split(e.currentTarget.value).length > 10) {
        setIsOver(true)
        return
      }
      if (isEmpty) {
        setIsEmpty(false)
        return
      }
      if (isOver) {
        setIsOver(false)
        return
      }
    },
    [isEmpty, isOver, isFirstEmpty],
  )

  return {
    isEmpty,
    isOver,
    isFirstEmpty,
    nameInput,
    saveName,
    validation,
  }
}

export default useName
