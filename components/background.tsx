import {useState} from 'react'
import style from '~/styles/background.module.scss'
import BackgroundSelect from '~/components/background/backgroundSelect'
import BackgroundEdit from '~/components/background/backgroundEdit'

const background = (props) => {
  const [backgroundScene, setBackgroundScene] = useState('select')
  const [selectedImage, setSelectedImage] = useState('')
  const SetImage = () => {
    switch(backgroundScene) {
      case 'select':
        return (
          <BackgroundSelect
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
            background={props.background}
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