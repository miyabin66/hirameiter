// import axios, { AxiosResponse } from 'axios'
import style from '~/styles/complete.module.scss'
import useComplete from '~/hooks/useComplete'
import { useIndexContext } from '~/context/IndexContext'

const complete = (): JSX.Element => {
  const { isUploading, backTopPage, uploadImage } = useComplete()
  const { complete } = useIndexContext()

  return (
    <div className={style.complete}>
      <div className={style.complete__uploading} data-isuploading={isUploading}>
        <div className={style.complete__loader}></div>
      </div>
      <p className={style.complete__text}>
        完成だ！早速保存して隣近所に
        <br />
        バラまいて来ようぜ！
      </p>
      <img className={style.complete__image} src={complete} alt="" />
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
