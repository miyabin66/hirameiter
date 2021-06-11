import { Dispatch, SetStateAction } from 'react'
import axios, { AxiosResponse } from 'axios'
import style from '~/styles/complete.module.scss'
import { createTwitterIntent } from '~/scripts/twitterShare'

type Props = {
  complete: string
  setScene: Dispatch<SetStateAction<string>>
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
  const backTopPage = () => {
    props.setScene('top')
  }
  return (
    <div className={style.complete}>
      <p className={style.complete__text}>
        完成だ！早速隣近所にバラまいて来ようぜ！
      </p>
      <img className={style.complete__image} src={props.complete} alt="" />
      <div className={style.complete__wrap}>
        <button onClick={uploadImage}>Twitterに投稿する</button>
        <button onClick={backTopPage}>Topページに戻る</button>
      </div>
    </div>
  )
}

export default complete
