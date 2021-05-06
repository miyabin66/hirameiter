import { useRef } from 'react'
import style from '~/styles/background/select.module.scss'

const select = (props): JSX.Element => {
  const imageInput = useRef(null)
  const setImage = () => {
    const image = imageInput.current.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      props.setSelectedImage(e.target.result)
      props.setBackgroundScene('edit')
    }
    reader.readAsDataURL(image)
  }
  return (
    <div className={style.backgroundSelect}>
      <input
        type="file"
        accept="image/*"
        className={style.backgroundSelect__input}
        onChange={setImage}
        ref={imageInput}
      />
    </div>
  )
}

export default select
