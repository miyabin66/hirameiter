import style from '~/styles/complete.module.scss'

type Props = {
  complete: string
}

const complete = (props: Props): JSX.Element => {
  return (
    <div>
      <p>完成だ！早速隣近所にバラまいて来ようぜ！</p>
      <img className={style.image} src={props.complete} alt="" />
    </div>
  )
}

export default complete
