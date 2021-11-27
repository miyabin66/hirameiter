import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import split from 'graphemesplit'
import style from '~/styles/name.module.scss'
import { useIndexContext } from '~/context/IndexContext'
import { Scene } from '~/interfaces/enums'

const name = (): JSX.Element => {
  const { isTopScene, setScene, setName, setIsTopScene } = useIndexContext()
  const nameInput = useRef(null)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const [isFirstEmpty, setIsFirstEmpty] = useState(true)
  useEffect(() => {
    if (isTopScene) {
      nameInput.current.value = ''
      setIsTopScene(false)
    }
  })
  const saveName = useCallback((): void => {
    setName(nameInput.current.value)
    setScene(Scene.background)
  }, [])
  const validation: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isFirstEmpty) {
        return setIsFirstEmpty(false)
      }
      if (!e.currentTarget.value) {
        return setIsEmpty(true)
      }
      if (split(e.currentTarget.value).length > 10) {
        return setIsOver(true)
      }
      if (isEmpty) {
        return setIsEmpty(false)
      }
      if (isOver) {
        return setIsOver(false)
      }
    },
    [isEmpty, isOver, isFirstEmpty],
  )
  return (
    <div className={style.name}>
      <p className={style.name__text}>
        トレーニングしてる奴の名前を入れてくれよな！ちなみに10文字までしか認めねーぞ
      </p>
      <div className={style.name__wrap}>
        <input
          type="text"
          className={style.name__input}
          ref={nameInput}
          onChange={validation}
        ></input>
        <button
          className={style.name__button}
          onClick={saveName}
          data-isempty={isEmpty}
          data-islimitover={isOver}
          data-isfirstempty={isFirstEmpty}
        >
          次へ
        </button>
      </div>
      <p className={style.name__error__empty} data-isempty={isEmpty}>
        何も入力してねーじゃねえか！
        <br />
        ボタン押させねーぞ！
      </p>
      <p className={style.name__error__over} data-isover={isOver}>
        おいおい10文字以内にしろよ！
        <br />
        そうしねーとボタン隠したままにするぞ！
      </p>
    </div>
  )
}

export default name
