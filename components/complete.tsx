import axios, { AxiosResponse } from 'axios'
import style from '~/styles/complete.module.scss'
import { createTwitterIntent } from '~/scripts/twitterShare'

type Props = {
  complete: string
}

type upload = {
  url: string
}

const complete = (props: Props): JSX.Element => {
  const uploadImage = async () => {
    const res: AxiosResponse<upload> = await axios.post('/api/upload', {
      image: props.complete,
    })
    window.location.href = createTwitterIntent({
      url: 'https://hirameiter.vercel.app/',
      text: `トレーナー！お前いつも暇なんだな ${res.data.url}`,
      hashtags: ['ひらめいたー'].join(','),
    })
  }
  return (
    <div className={style.complete}>
      <p className={style.complete__text}>
        完成だ！早速隣近所にバラまいて来ようぜ！
      </p>
      <img className={style.complete__image} src={props.complete} alt="" />
      <button onClick={uploadImage}>twitter</button>
    </div>
  )
}

export default complete
