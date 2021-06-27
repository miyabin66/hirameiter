import { Dispatch, SetStateAction, useCallback, useRef } from 'react'
import style from '~/styles/background.module.scss'

type Props = {
  setScene: Dispatch<SetStateAction<string>>
  setSelectedImage: Dispatch<SetStateAction<string | ArrayBuffer>>
  setBackgroundScene: Dispatch<SetStateAction<string>>
}

const select = (props: Props): JSX.Element => {
  const imageInput = useRef(null)
  const setImage = useCallback(() => {
    const image = imageInput.current.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      props.setSelectedImage(e.target.result)
      props.setBackgroundScene('edit')
    }
    reader.readAsDataURL(image)
  }, [])
  const backScene = useCallback(() => {
    props.setScene('name')
  }, [])
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
      <button onClick={backScene}>名前入力に戻る</button>
    </div>
  )
}

export default select
