import { useIndexContext } from '~/context/IndexContext'
import useConfirm from '~/hooks/useConfirm'
import style from '~/styles/confirm.module.scss'

const confirm = (): JSX.Element => {
  const { name } = useIndexContext()
  const { isMaking, canvas, backScene, clickConfirm } = useConfirm()

  return (
    <div className={style.confirm}>
      <div className={style.confirm__making} data-ismaking={isMaking}>
        <div className={style.confirm__loader}></div>
      </div>
      <p className={style.confirm__text}>こんな感じでいいか？</p>
      <canvas ref={canvas} className={style.confirm__canvas}></canvas>
      <div className={style.confirm__wrap}>
        <button className={style.confirm__button} onClick={backScene}>
          画像選択に戻る
        </button>
        <button className={style.confirm__button} onClick={clickConfirm}>
          OK
        </button>
      </div>
      <p className={style.confirm__text__hidden}>
        その時、ふと閃いた！このアイディアは、{name}
        とのトレーニングに活かせるかもしれない！
      </p>
    </div>
  )
}

export default confirm
