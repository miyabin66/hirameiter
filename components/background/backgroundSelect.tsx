import useBackgroundSelect from '~/hooks/useBackgroundSelect'
import style from '~/styles/background.module.scss'

const select = (): JSX.Element => {
  const { imageInput, setImage, back } = useBackgroundSelect()

  return (
    <div>
      <p className={style.background__text}>
        トレーニング風景を選んでくれ！
        <br />
        無かったらお前の好きな
        <br />
        UMAの写真でもいいぞ
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={setImage}
        ref={imageInput}
      />
      <button className={style.background__select__button} onClick={back}>
        名前入力に戻る
      </button>
    </div>
  )
}

export default select
