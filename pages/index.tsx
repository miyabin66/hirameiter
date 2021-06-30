import { useState } from 'react'
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
  const [isTopScene, setIsTopScene] = useState(true)
  const [background, setBackground] = useState(STATE.background)
  const [complete, setComplete] = useState(STATE.complete)
  return (
    <div className={style.index}>
      <Default />
      <div className={style.index__top} data-isscene={scene}>
        <Top setScene={setScene} />
      </div>
      <div className={style.index__name} data-isscene={scene}>
        <Name
          isTopScene={isTopScene}
          setScene={setScene}
          setName={setName}
          setIsTopScene={setIsTopScene}
        />
      </div>
      <div className={style.index__background} data-isscene={scene}>
        <Background setScene={setScene} setBackground={setBackground} />
      </div>
      <div className={style.index__confirm} data-isscene={scene}>
        <Confirm
          setScene={setScene}
          setComplete={setComplete}
          name={name}
          background={background}
        />
      </div>
      <div className={style.index__complete} data-isscene={scene}>
        <Complete
          complete={complete}
          setIsTopScene={setIsTopScene}
          setScene={setScene}
        />
      </div>
    </div>
  )
}

export default index
