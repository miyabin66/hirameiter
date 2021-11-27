import { Dispatch, SetStateAction, useCallback, useState } from 'react'
// import axios, { AxiosResponse } from 'axios'
import style from '~/styles/complete.module.scss'
import { createTwitterIntent } from '~/scripts/twitterShare'
import { useHasTouchScreen } from '~/hooks/useHasTouchScreen'
import useMedia from '~/hooks/useMedia'

type Props = {
  complete: string
  setIsTopScene: Dispatch<SetStateAction<boolean>>
  setScene: Dispatch<SetStateAction<string>>
}

// type upload = {
//   url: string
// }

const complete = (props: Props): JSX.Element => {
  const [isUploading, setIsUploading] = useState(false)
  const { hasTouchScreen } = useHasTouchScreen()
  const media = useMedia()
  const uploadImage = useCallback(async () => {
    setIsUploading(true)
    // const res: AxiosResponse<upload> = await axios.post('/api/upload', {
    //   image: props.complete,
    // })
    // const shareURL = createTwitterIntent({
    //   url: 'https://hirameiter.vercel.app/',
    //   text: `明日のトレーニングはこれで決まりだな！ ${res.data.url}`,
    //   hashtags: ['ひらめいたー'].join(','),
    // })
    const shareURL = createTwitterIntent({
      url: 'https://hirameiter.vercel.app/',
      text: `明日のトレーニングはこれで決まりだな！`,
      hashtags: ['ひらめいたー'].join(','),
    })
    setIsUploading(false)
    if (media.pc && !hasTouchScreen) {
      window.open(shareURL, '_blank', 'noreferrer')
    } else {
      window.location.href = shareURL
    }
  }, [])
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
        完成だ！早速保存して隣近所にバラまいて来ようぜ！
      </p>
      <img className={style.complete__image} src={props.complete} alt="" />
      <div className={style.complete__wrap}>
        <button className={style.confirm__button} onClick={backTopPage}>
          Topページに戻る
        </button>
        <button className={style.confirm__button} onClick={uploadImage}>
          Twitterでシェアする
        </button>
      </div>
    </div>
  )
}

export default complete
