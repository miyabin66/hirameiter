import { useState } from 'react'
import style from '~/styles/background.module.scss'
import BackgroundSelect from '~/components/background/backgroundSelect'
import BackgroundEdit from '~/components/background/backgroundEdit'
import { useIndexContext } from '~/context/IndexContext'

const background = (): JSX.Element => {
  const { setScene, setBackground } = useIndexContext()
  const [backgroundScene, setBackgroundScene] = useState('select')
  const [selectedImage, setSelectedImage] = useState('')
  return (
    <div className={style.background}>
      <div className={style.background__select} data-is-scene={backgroundScene}>
        <BackgroundSelect
          setScene={setScene}
          setBackgroundScene={setBackgroundScene}
          setSelectedImage={setSelectedImage}
        />
      </div>
      <div className={style.background__edit} data-is-scene={backgroundScene}>
        <BackgroundEdit
          setScene={setScene}
          setBackgroundScene={setBackgroundScene}
          selectedImage={selectedImage}
          setBackground={setBackground}
        />
      </div>
    </div>
  )
}

export default background
