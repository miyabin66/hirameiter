import { Dispatch, SetStateAction, useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

type Props = {
  setBackground: Dispatch<SetStateAction<string>>
  setScene: Dispatch<SetStateAction<string>>
  setBackgroundScene: Dispatch<SetStateAction<string>>
  selectedImage: string
}

const select = (props: Props): JSX.Element => {
  const cropperRef = useRef(null)

  const setImage = () => {
    const imageElement = cropperRef.current
    const cropper = imageElement.cropper
    props.setBackground(cropper.getCroppedCanvas().toDataURL())
    props.setScene('confirm')
    props.setBackgroundScene('select')
  }

  return (
    <div>
      <Cropper
        src={props.selectedImage}
        style={{ height: 400, width: '325px' }}
        viewMode={1}
        aspectRatio={9 / 16}
        ref={cropperRef}
      />
      <button onClick={setImage}>次へ</button>
    </div>
  )
}

export default select
