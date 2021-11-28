import { MutableRefObject, useCallback, useRef } from 'react'
import { useIndexContext } from '~/context/IndexContext'
import { BackgroundScene, Scene } from '~/interfaces/enums'

interface TypeReturn {
  cropperRef: MutableRefObject<CropperRef>
  setImage: () => void
}

interface CropperRef extends HTMLImageElement {
  cropper: Cropper
}

const useBackgroundEdit = (): TypeReturn => {
  const { setScene, setBackground, setBackgroundScene } = useIndexContext()
  const cropperRef = useRef<CropperRef>(null)

  const setImage = useCallback(() => {
    const imageElement = cropperRef.current
    const cropper = imageElement.cropper
    setBackground(cropper.getCroppedCanvas().toDataURL())
    setScene(Scene.confirm)
    setBackgroundScene(BackgroundScene.select)
  }, [])

  return {
    cropperRef,
    setImage,
  }
}

export default useBackgroundEdit
