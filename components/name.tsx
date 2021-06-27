import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react'
import split from 'graphemesplit'
import style from '~/styles/name.module.scss'

type Props = {
  setName: Dispatch<SetStateAction<string>>
  setScene: Dispatch<SetStateAction<string>>
}

const name = (props: Props): JSX.Element => {
  const nameInput = useRef(null)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLimitOver, setIsLimitOver] = useState(false)
  const [isFirstEmpty, setIsFirstEmpty] = useState(true)
  const setName = useCallback((): void => {
    props.setName(nameInput.current.value)
    props.setScene('background')
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
        return setIsLimitOver(true)
      }
      if (isEmpty) {
        return setIsEmpty(false)
      }
      if (isLimitOver) {
        return setIsLimitOver(false)
      }
    },
    [isEmpty, isLimitOver, isFirstEmpty],
  )
  const Empty: () => JSX.Element = useCallback(() => {
    if (isEmpty) {
      return (
        <p className={style.name__error}>
          何も入力してねーじゃねえか！
          <br />
          ボタン押させねーぞ！
        </p>
      )
    }
    return <></>
  }, [isEmpty])
  const LimitOver: () => JSX.Element = useCallback(() => {
    if (isLimitOver) {
      return (
        <p className={style.name__error}>
          おいおい10文字以内にしろよ！
          <br />
          そうしねーとボタン隠したままにするぞ！
        </p>
      )
    }
    return <></>
  }, [isLimitOver])
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
          onClick={setName}
          data-isempty={isEmpty}
          data-islimitover={isLimitOver}
          data-isfirstempty={isFirstEmpty}
        >
          次へ
        </button>
      </div>
      <Empty />
      <LimitOver />
    </div>
  )
}

export default name
