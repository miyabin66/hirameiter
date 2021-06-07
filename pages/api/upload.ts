import Twitter from 'twitter'
import dotenv from 'dotenv'
import { NextApiRequest, NextApiResponse } from 'next'

dotenv.config()

const upload = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })
  const media = await client.post('media/upload', {
    media_data: req.body.image.split(',')[1],
  })
  const post = await client.post('statuses/update', {
    status: `${new Date()}`,
    media_ids: media.media_id_string,
  })
  return res.send({ id: post })
}

export default upload
