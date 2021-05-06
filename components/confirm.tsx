import {useEffect} from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  Texture
} from 'three'
import readImage from '~/scripts/readImage'
import style from '~/styles/confirm.module.scss'

const confirm = (props) => {
  useEffect(() => {
    init()
  })

  const init = async () => {
    const width = 750
    const height = 1334

    const canvas = document.querySelector('canvas')
    canvas.width = width
    canvas.height = height

    const renderer = new WebGLRenderer({ canvas })

    const scene = new Scene()

    const camera = new PerspectiveCamera(90, width / height)
    camera.position.set(0, 0, height / 2)

    const ambientLight = new AmbientLight(0xffffff)
    scene.add(ambientLight)

    const texture = await readImage(props.background) as Texture

    const geometry = new PlaneGeometry(width, height)
    const material = new MeshStandardMaterial({
      map: texture,
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)
    renderer.render(scene, camera)
  }

  return (
    <div>
      <canvas id='canvas' className={style.confirm__canvas}></canvas>
    </div>
  )
}

export default confirm