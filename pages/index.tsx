import Default from '~/layouts/default'
import Top from '~/components/top'
import style from '~/styles/index.module.scss'

const index = () => {
  const scene: string = 'top'
  const AppearScene = () => {
    switch (scene) {
      case 'top':
        return <Top />
      default:
        break
    }
  }
  return(
    <div className={style.index}>
      <Default />
        <AppearScene />
    </div>
  )
}

export default index