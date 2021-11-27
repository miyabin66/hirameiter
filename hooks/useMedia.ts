import { UAParser } from 'ua-parser-js'

interface Media {
  sp: boolean
  tablet: boolean
  pc: boolean
}

const useMedia = (): Media => {
  const parser = new UAParser()
  const device = parser.getDevice().type

  const media: Media = {
    sp: device === 'mobile',
    tablet: device === 'tablet',
    pc: device === undefined,
  }

  return media
}

export default useMedia
