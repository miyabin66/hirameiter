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
  const setName = (): void => {
    props.setName(nameInput.current.value)
    props.setScene('background')
  }
  const validation: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.currentTarget.value) {
      return setIsEmpty(true)
    }
    if (split(e.currentTarget.value).length > 10) {
      console.log(0)
      return setIsLimitOver(true)
    }
    if (isEmpty || isLimitOver) {
      setIsEmpty(false)
      setIsLimitOver(false)
    }
  }
  const Empty: () => JSX.Element = useCallback(() => {
    if (isEmpty) {
      return (
        <p>
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
        <p>
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
      <p>
        トレーニングしてる奴の名前を入れてくれよな！
        <br />
        10文字までしか入らねーから気をつけろよ
      </p>
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
      >
        次へ
      </button>
      <Empty />
      <LimitOver />
    </div>
  )
}

export default name
