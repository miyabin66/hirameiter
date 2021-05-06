import { useEffect } from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
} from 'three'
import readImage from '~/scripts/readImage'
import { width, height } from '~/scripts/variables'
import style from '~/styles/confirm.module.scss'

const confirm = (props): JSX.Element => {
  useEffect(() => {
    init()
  })

  const init = async () => {
    const canvas = document.querySelector('canvas')
    canvas.width = width
    canvas.height = height

    const renderer = new WebGLRenderer({ canvas })

    const scene = new Scene()

    const camera = new PerspectiveCamera(90, width / height)
    camera.position.set(0, 0, height / 2)

    const ambientLight = new AmbientLight(0xffffff)
    scene.add(ambientLight)

    const texture = await readImage(props.background)
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
      <canvas id="canvas" className={style.confirm__canvas}></canvas>
    </div>
  )
}

export default confirm
