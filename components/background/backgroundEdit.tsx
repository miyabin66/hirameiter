import { useRef } from 'react'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import style from '~/styles/background/edit.module.scss'

const select = (props) => {
  const cropperRef = useRef(null)

  const setImage = () => {
    const imageElement = cropperRef.current
    const cropper = imageElement.cropper
    props.setBackgroundScene(cropper.getCroppedCanvas().toDataURL())
    props.setScene('confirm')
    props.setBackgroundScene('select')
  }

  return(
    <div className={style.edit}>
      <Cropper
        src={props.selectedImage}
        style={{ height: 400, width: "100%" }}
        aspectRatio={9 / 16}
        ref={cropperRef}
      />
      <button onClick={setImage}>次へ</button>
    </div>
  )
}

export default select