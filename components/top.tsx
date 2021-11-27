import { useIndexContext } from '~/context/IndexContext'
import { Scene } from '~/interfaces/enums'
import style from '~/styles/top.module.scss'

const top = (): JSX.Element => {
  const { setScene } = useIndexContext()

  return (
    <div className={style.top}>
      <h1>その時、ふと閃いたー</h1>
      <button onClick={() => setScene(Scene.name)}>始める</button>
    </div>
  )
}

export default top
