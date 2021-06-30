import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import style from '~/styles/complete.module.scss'
import { createTwitterIntent } from '~/scripts/twitterShare'

type Props = {
  complete: string
  setIsTopScene: Dispatch<SetStateAction<boolean>>
  setScene: Dispatch<SetStateAction<string>>
}

type upload = {
  url: string
}

const complete = (props: Props): JSX.Element => {
  const [isUploading, setIsUploading] = useState(false)
  const uploadImage = useCallback(async () => {
    setIsUploading(true)
    const res: AxiosResponse<upload> = await axios.post('/api/upload', {
      image: props.complete,
    })
    setIsUploading(false)
    window.location.href = createTwitterIntent({
      url: 'https://hirameiter.vercel.app/',
      text: `トレーナー！お前いつも暇なんだな ${res.data.url}`,
      hashtags: ['ひらめいたー'].join(','),
    })
  }, [props.complete])
  const backTopPage = useCallback(() => {
    props.setScene('top')
    props.setIsTopScene(true)
  }, [])
  return (
    <div className={style.complete}>
      <div className={style.complete__uploading} data-isuploading={isUploading}>
        <div className={style.complete__loader}></div>
      </div>
      <p className={style.complete__text}>
        完成だ！早速隣近所にバラまいて来ようぜ！
      </p>
      <img className={style.complete__image} src={props.complete} alt="" />
      <div className={style.complete__wrap}>
        <button className={style.confirm__button} onClick={backTopPage}>
          Topページに戻る
        </button>
        <button className={style.confirm__button} onClick={uploadImage}>
          Twitterに投稿する
        </button>
      </div>
    </div>
  )
}

export default complete
