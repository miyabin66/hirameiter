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
    window.open(
      createTwitterIntent({
        url: 'https://hirameiter.vercel.app/',
        text: `トレーニング中だぞ！ by 自称宣伝部長 ${res.data.url}`,
        hashtags: ['ひらめいたー'].join(','),
      }),
      '_blank',
    )
  }
  return (
    <div>
      <p>完成だ！早速隣近所にバラまいて来ようぜ！</p>
      <img className={style.image} src={props.complete} alt="" />
      <button onClick={uploadImage}>twitter</button>
    </div>
  )
}

export default complete
