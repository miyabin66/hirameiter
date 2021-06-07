import axios, { AxiosResponse } from 'axios'
import style from '~/styles/complete.module.scss'
import { createTwitterIntent } from '~/scripts/twitterShare'

type Props = {
  complete: string
}

type upload = {
  id: string
}

const complete = (props: Props): JSX.Element => {
  const uploadImage = async () => {
    const res: AxiosResponse<upload> = await axios.post('/api/upload', {
      image: props.complete,
    })
    console.log(res.data.id)
    // createTwitterIntent({
    //   url: 'https://hirameiter.vercel.app/',
    //   text: `トレーニング中だぞ！ by 自称宣伝部長 `,
    //   hashtags: ['ひらめいたー'].join(','),
    // })
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
