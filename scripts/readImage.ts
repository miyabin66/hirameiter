const loadImage = (imageSrc, TextureLoader) => {
  return new Promise((resolve, _reject) => {
    return new TextureLoader().load(imageSrc, () => {
      console.log('load')
      resolve
    })
  })
}

export default loadImage