import {useRef} from 'react'
import style from '~/styles/name.module.scss'

const name = (props) => {
  const nameInput = useRef(null)
  const setName = () => {
    props.setName(nameInput.current.value)
    props.setScene('background')
  }
  return(
    <div className={style.name}>
      <input type='text' className={style.name__input} ref={nameInput}></input>
      <button onClick={setName}>次へ</button>
    </div>
  )
}

export default name