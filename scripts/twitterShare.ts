import qs from 'qs'

export const createTwitterIntent = (opts = {}): string => {
  return `http://twitter.com/intent/tweet?${qs.stringify(opts)}`
}
