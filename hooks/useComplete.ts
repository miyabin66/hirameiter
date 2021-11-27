import { useCallback, useState } from 'react'
import { useHasTouchScreen } from './useHasTouchScreen'
import useMedia from './useMedia'
import { createTwitterIntent } from '~/scripts/twitterShare'
import { useIndexContext } from '~/context/IndexContext'
import { Scene } from '~/interfaces/enums'

interface Return {
  isUploading: boolean
  uploadImage: () => void
  backTopPage: () => void
}

// interface upload {
//   url: string
// }

const useComplete = (): Return => {
  const { setScene, setName, setIsTopScene, setBackground } = useIndexContext()
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
    setScene(Scene.top)
    setName(null)
    setBackground(null)
    setIsTopScene(true)
  }, [])

  return {
    isUploading,
    uploadImage,
    backTopPage,
  }
}

export default useComplete
