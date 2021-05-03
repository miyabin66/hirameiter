import Default from '~/layouts/default'
import Top from '~/components/top'
import Name from '~/components/name'
import Background from '~/components/background'
import Complete from '~/components/complete'
import style from '~/styles/index.module.scss'
import { useState } from 'react'

const index = () => {
  const [scene, setScene] = useState('name')
  const [name, setName] = useState('')
  const [background, setBackground] = useState('')
  const AppearScene = () => {
    switch (scene) {
      case 'top':
        return <Top setScene={setScene} />
      case 'name':
        return <Name setScene={setScene} setName={setName} />
      case 'picture':
        return <Background setScene={setScene} setBackground={setBackground} />
      case 'complete':
        return <Complete setScene={setScene} name={name} background={background} />
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