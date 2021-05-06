import { TextureLoader } from 'three'

const loadImage = (imageSrc: string) => {
  return new Promise((resolve, _reject) => {
    const texture = new TextureLoader().load(imageSrc, () => {
      resolve(texture)
    })
  })
}

export default loadImage