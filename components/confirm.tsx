import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import drawCanvas from '~/scripts/drawCanvas'
import style from '~/styles/confirm.module.scss'

type Props = {
  setScene: Dispatch<SetStateAction<string>>
  setComplete: Dispatch<SetStateAction<string>>
  name: string
  background: string
}

const confirm = (props: Props): JSX.Element => {
  const canvas = useRef<HTMLCanvasElement>()
  const [isMaking, setIsMaking] = useState(false)
  const [name, setIsName] = useState('')
  useEffect(() => {
    if (props.name && props.background) {
      if (props.name !== name) {
        globalThis.FONTPLUS.reload(true)
        setIsName(props.name)
      }
      drawCanvas(props, setIsMaking)
    }
  }, [props])

  const clickConfirm = useCallback(() => {
    props.setComplete(canvas.current.toDataURL('image/jpeg'))
    props.setScene('complete')
  }, [])
  const backScene = useCallback(() => {
    props.setScene('background')
  }, [])
  return (
    <div className={style.confirm}>
      <div className={style.confirm__making} data-ismaking={isMaking}>
        <div className={style.confirm__loader}></div>
      </div>
      <p className={style.confirm__text}>こんな感じでいいか？</p>
      <canvas
        id="canvas"
        ref={canvas}
        className={style.confirm__canvas}
      ></canvas>
      <div className={style.confirm__wrap}>
        <button className={style.confirm__button} onClick={backScene}>
          画像選択に戻る
        </button>
        <button className={style.confirm__button} onClick={clickConfirm}>
          OK
        </button>
      </div>
      <p className={style.confirm__text__hidden}>
        その時、ふと閃いた！このアイディアは、{props.name}
        とのトレーニングに活かせるかもしれない！
      </p>
    </div>
  )
}

export default confirm
