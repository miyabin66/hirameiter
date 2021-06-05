import Twitter from 'twitter'
import dotenv from 'dotenv'
import { NextApiResponse } from 'next'
import axios from 'axios'

dotenv.config()

interface twitter {
  media_id: number
  media_id_string: string
  size: number
  expires_after_secs: number
  image: {
    image_type: string
    w: number
    h: number
  }
}

const upload = async (
  {
    image,
  }: {
    image: string
  },
  res: NextApiResponse,
): Promise<null> => {
  // const twitterRes: AxiosResponse<twitter> = await axios.post(
  //   'https://upload.twitter.com/1.1/media/upload.json',
  //   {
  //     media_data: image,
  //   },
  //   {
  //     headers: {
  //       'Content-Type': 'multipart/form-data;',
  //     },
  //   },
  // )
  // console.log(twitterRes)
  // res.status(200).json({ id: twitterRes.data.media_id_string })
  const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  })
  client.post('media/upload', { media: image }, (error, media) => {
    if (error) {
      console.log(error)
    }
    res.send({ id: media.media_id_string })
  })
  return
}

export default upload
