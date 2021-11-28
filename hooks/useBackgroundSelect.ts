import { MutableRefObject, useCallback, useRef } from 'react'
import { useIndexContext } from '~/context/IndexContext'
import { BackgroundScene, Scene } from '~/interfaces/enums'

interface TypeReturn {
  imageInput: MutableRefObject<HTMLInputElement>
  setImage: () => void
  back: () => void
}

const useBackgroundSelect = (): TypeReturn => {
  const { setScene, setSelectedImage, setBackgroundScene } = useIndexContext()
  const imageInput = useRef<HTMLInputElement>(null)

  const setImage = useCallback(() => {
    const image = imageInput.current.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const file = e.target.result as string
      setSelectedImage(file)
      setBackgroundScene(BackgroundScene.edit)
      imageInput.current.value = ''
    }
    reader.readAsDataURL(image)
  }, [])

  const back = useCallback(() => {
    setScene(Scene.name)
  }, [])

  return {
    imageInput,
    setImage,
    back,
  }
}

export default useBackgroundSelect
