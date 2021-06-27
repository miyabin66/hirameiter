import { useCallback, useState } from 'react'
import Default from '~/layouts/default'
import Top from '~/components/top'
import Name from '~/components/name'
import Background from '~/components/background'
import Confirm from '~/components/confirm'
import Complete from '~/components/complete'
import { STATE } from '~/scripts/variables'
import style from '~/styles/index.module.scss'

const index = (): JSX.Element => {
  const [scene, setScene] = useState(STATE.scene)
  const [name, setName] = useState(STATE.name)
  const [background, setBackground] = useState(STATE.background)
  const [complete, setComplete] = useState(STATE.complete)
  const AppearScene = useCallback(() => {
    switch (scene) {
      case 'top':
        return <Top setScene={setScene} />
      case 'name':
        return (
          <Name registeredName={name} setScene={setScene} setName={setName} />
        )
      case 'background':
        return <Background setScene={setScene} setBackground={setBackground} />
      case 'confirm':
        return (
          <Confirm
            setScene={setScene}
            setComplete={setComplete}
            name={name}
            background={background}
          />
        )
      case 'complete':
        return <Complete complete={complete} setScene={setScene} />
      default:
        break
    }
  }, [scene])
  return (
    <div className={style.index}>
      <Default />
      <AppearScene />
    </div>
  )
}

export default index
