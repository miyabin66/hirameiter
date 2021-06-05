import fs from 'fs'
import Twitter from 'twitter'
import dotenv from 'dotenv'
import { NextApiRequest, NextApiResponse } from 'next'
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
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<null> => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    // bearer_token: process.env.TWITTER_BEARER_TOKEN,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })
  const params = { media_data: req.body.image }
  client.post('media/upload', params, (error, media, response) => {
    if (error) {
      console.log(response.errors)
      console.log(error)
    }
    console.log(media)
    res.send({ id: media.media_id_string })
  })
  return
}

export default upload
