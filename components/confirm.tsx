import { useCallback, useEffect, useRef, useState } from 'react'
import { useIndexContext } from '~/context/IndexContext'
import { Scene } from '~/interfaces/enums'
import drawCanvas from '~/scripts/drawCanvas'
import style from '~/styles/confirm.module.scss'

const confirm = (): JSX.Element => {
  const { name, background, setScene, setComplete } = useIndexContext()
  const canvas = useRef<HTMLCanvasElement>()
  const [isMaking, setIsMaking] = useState(false)
  const [beforeName, setBeforeName] = useState<string>('')

  useEffect(() => {
    if (name && background && !isMaking) {
      if (name !== beforeName) {
        globalThis.FONTPLUS.reload(true)
        setBeforeName(name)
        setIsMaking(true)
        drawCanvas({ name, image: background }).then(() => {
          setIsMaking(false)
        })
      }
    }
  }, [name, background])

  const clickConfirm = useCallback(() => {
    setComplete(canvas.current.toDataURL('image/jpeg'))
    setScene(Scene.complete)
  }, [])
  const backScene = useCallback(() => {
    setScene(Scene.background)
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
        その時、ふと閃いた！このアイディアは、{name}
        とのトレーニングに活かせるかもしれない！
      </p>
    </div>
  )
}

export default confirm
