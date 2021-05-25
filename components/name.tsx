import { Dispatch, SetStateAction, useRef } from 'react'
import style from '~/styles/name.module.scss'

type Props = {
  setName: Dispatch<SetStateAction<string>>
  setScene: Dispatch<SetStateAction<string>>
}

const name = (props: Props): JSX.Element => {
  const nameInput = useRef(null)
  const setName = () => {
    props.setName(nameInput.current.value)
    props.setScene('background')
  }
  return (
    <div className={style.name}>
      <p>一緒にトレーニングしている娘の名前を教えてください</p>
      <input type="text" className={style.name__input} ref={nameInput}></input>
      <button onClick={setName}>次へ</button>
    </div>
  )
}

export default name
