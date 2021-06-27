import { Dispatch, SetStateAction, useState } from 'react'
import style from '~/styles/background.module.scss'
import BackgroundSelect from '~/components/background/backgroundSelect'
import BackgroundEdit from '~/components/background/backgroundEdit'

type Props = {
  setScene: Dispatch<SetStateAction<string>>
  setBackground: Dispatch<SetStateAction<string>>
}

const background = (props: Props): JSX.Element => {
  const [backgroundScene, setBackgroundScene] = useState('select')
  const [selectedImage, setSelectedImage] = useState('')
  return (
    <div className={style.background}>
      <div className={style.background__select} data-isscene={backgroundScene}>
        <BackgroundSelect
          setScene={props.setScene}
          setBackgroundScene={setBackgroundScene}
          setSelectedImage={setSelectedImage}
        />
      </div>
      <div className={style.background__edit} data-isscene={backgroundScene}>
        <BackgroundEdit
          setScene={props.setScene}
          setBackgroundScene={setBackgroundScene}
          selectedImage={selectedImage}
          setBackground={props.setBackground}
        />
      </div>
    </div>
  )
}

export default background
