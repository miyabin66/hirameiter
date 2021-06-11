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
  const SetImage = () => {
    switch (backgroundScene) {
      case 'select':
        return (
          <BackgroundSelect
            setScene={props.setScene}
            setBackgroundScene={setBackgroundScene}
            setSelectedImage={setSelectedImage}
          />
        )
      case 'edit':
        return (
          <BackgroundEdit
            setScene={props.setScene}
            setBackgroundScene={setBackgroundScene}
            selectedImage={selectedImage}
            setBackground={props.setBackground}
          />
        )
      default:
        break
    }
  }
  return (
    <div className={style.name}>
      <SetImage />
    </div>
  )
}

export default background
