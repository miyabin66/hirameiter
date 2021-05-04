import style from '~/styles/background/edit.module.scss'

const select = (props) => {
  const setImage = () => {
    props.setScene('confirm')
    props.setBackgroundScene('select')
  }
  return(
    <div className={style.edit}>
      <p>{props.selectedImage}</p>
      <button onClick={setImage}>次へ</button>
    </div>
  )
}

export default select