import Default from '~/layouts/default'
import Top from '~/components/top'
import style from '~/styles/index.module.scss'
import { useState } from 'react'

const index = () => {
  const [scene, setScene] = useState('top')
  const AppearScene = () => {
    switch (scene) {
      case 'top':
        return <Top setScene={setScene} />
      case 'name':
        return <div>name</div>
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