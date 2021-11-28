import style from '~/styles/background.module.scss'
import BackgroundSelect from '~/components/background/backgroundSelect'
import BackgroundEdit from '~/components/background/backgroundEdit'
import { useIndexContext } from '~/context/IndexContext'

const background = (): JSX.Element => {
  const { backgroundScene } = useIndexContext()

  return (
    <div className={style.background}>
      <div className={style.background__select} data-is-scene={backgroundScene}>
        <BackgroundSelect />
      </div>
      <div className={style.background__edit} data-is-scene={backgroundScene}>
        <BackgroundEdit />
      </div>
    </div>
  )
}

export default background
