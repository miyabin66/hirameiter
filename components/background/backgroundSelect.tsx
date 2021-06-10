import { Dispatch, SetStateAction, useRef } from 'react'
import style from '~/styles/background.module.scss'

type Props = {
  setSelectedImage: Dispatch<SetStateAction<string | ArrayBuffer>>
  setBackgroundScene: Dispatch<SetStateAction<string>>
}

const select = (props: Props): JSX.Element => {
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
    <div>
      <p className={style.background__text}>
        トレーニング風景を選んでくれ！
        <br />
        無かったらお前の好きなUMAの写真でもいいぞ
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={setImage}
        ref={imageInput}
      />
    </div>
  )
}

export default select
