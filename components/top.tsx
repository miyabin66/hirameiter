import style from '~/styles/top.module.scss'

const top = (props) => {
  return(
    <div className={style.top}>
      <h1>その時、ふと閃いたー</h1>
      <button onClick={() => props.setScene('name')}>始める</button>
    </div>
  )
}

export default top