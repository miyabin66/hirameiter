import { TextureLoader, Texture } from 'three'

const loadImage = (imageSrc: string): Promise<Texture> => {
  return new Promise((resolve, _reject) => {
    const texture = new TextureLoader().load(imageSrc, () => {
      return resolve(texture)
    })
  })
}

export default loadImage