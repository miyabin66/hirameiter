import Cropper from 'react-cropper'
import { useIndexContext } from '~/context/IndexContext'
import useBackgroundEdit from '~/hooks/useBackgroundEdit'
import style from '~/styles/background.module.scss'
import 'cropperjs/dist/cropper.css'

const select = (): JSX.Element => {
  const { selectedImage } = useIndexContext()
  const { cropperRef, setImage } = useBackgroundEdit()

  return (
    <div>
      <p className={style.background__text}>
        全部は入らねーから適当に切り抜いてくれ
        <br />
        コツはコブシを効かせてひねる感じだぞ
      </p>
      <Cropper
        src={selectedImage}
        style={{ height: 400, width: 325 }}
        viewMode={1}
        aspectRatio={9 / 16}
        ref={cropperRef}
      />
      <button onClick={setImage}>次へ</button>
    </div>
  )
}

export default select
