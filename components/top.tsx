import { Dispatch, SetStateAction } from 'react'
import style from '~/styles/top.module.scss'

type Props = {
  setScene: Dispatch<SetStateAction<string>>
}

const top = (props: Props): JSX.Element => {
  return (
    <div className={style.top}>
      <h1>その時、ふと閃いたー</h1>
      <button onClick={() => props.setScene('name')}>始める</button>
    </div>
  )
}

export default top
