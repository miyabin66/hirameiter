import Default from '~/layouts/default'
import Top from '~/components/top'
import Name from '~/components/name'
import Background from '~/components/background'
import Confirm from '~/components/confirm'
import Complete from '~/components/complete'
import style from '~/styles/index.module.scss'
import { useIndexContext } from '~/context/IndexContext'

const Presenter = (): JSX.Element => {
  const { scene } = useIndexContext()

  return (
    <div className={style.index}>
      <Default />
      <div className={style.index__top} data-is-scene={scene}>
        <Top />
      </div>
      <div className={style.index__name} data-is-scene={scene}>
        <Name />
      </div>
      <div className={style.index__background} data-is-scene={scene}>
        <Background />
      </div>
      <div className={style.index__confirm} data-is-scene={scene}>
        <Confirm />
      </div>
      <div className={style.index__complete} data-is-scene={scene}>
        <Complete />
      </div>
    </div>
  )
}

export default Presenter
