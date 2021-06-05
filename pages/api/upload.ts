import Twitter from 'twitter'
import dotenv from 'dotenv'
import { NextApiRequest, NextApiResponse } from 'next'

dotenv.config()

const upload = (req: NextApiRequest, res: NextApiResponse): void => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    // bearer_token: process.env.TWITTER_BEARER_TOKEN,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })
  const params = { media_data: req.body.image }
  client.post('media/upload', params, (error, media) => {
    if (error) {
      console.log(error)
    }
    res.send({ id: media.media_id_string })
  })
}

export default upload
