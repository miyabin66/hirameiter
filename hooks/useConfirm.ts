import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Scene } from '~/interfaces/enums'
import drawCanvas from '~/scripts/drawCanvas'
import { useIndexContext } from '~/context/IndexContext'

interface TypeReturn {
  isMaking: boolean
  canvas: MutableRefObject<HTMLCanvasElement>
  backScene: () => void
  clickConfirm: () => void
}

const useConfirm = (): TypeReturn => {
  const { name, background, setScene, setComplete } = useIndexContext()
  const canvas = useRef<HTMLCanvasElement>(null)
  const [isMaking, setIsMaking] = useState<boolean>(false)
  const [beforeName, setBeforeName] = useState<string>('')

  useEffect(() => {
    if (name && background && !isMaking) {
      if (name !== beforeName) {
        globalThis.FONTPLUS.reload(true)
        setBeforeName(name)
        setIsMaking(true)
        drawCanvas({ canvas: canvas.current, name, image: background }).then(
          () => {
            setIsMaking(false)
          },
        )
      }
    }
  }, [name, background, isMaking])

  const clickConfirm = useCallback(() => {
    setComplete(canvas.current.toDataURL('image/jpeg'))
    setScene(Scene.complete)
  }, [])

  const backScene = useCallback(() => {
    setScene(Scene.background)
  }, [])

  return {
    isMaking,
    canvas,
    backScene,
    clickConfirm,
  }
}

export default useConfirm
