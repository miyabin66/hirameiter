import {useEffect, useRef} from 'react'
import style from '~/styles/confirm.module.scss'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  TextureLoader,
  MeshStandardMaterial,
  Mesh,
  AmbientLight
} from 'three'

const confirm = (props) => {
  useEffect(() => {
    init()
  })

  const init = () => {
    const width = 750
    const height = 1334

    const canvas = document.querySelector('canvas')
    canvas.width = width
    canvas.height = height

    const renderer = new WebGLRenderer({ canvas })

    const scene = new Scene()

    const camera = new PerspectiveCamera(90, width / height)
    camera.position.set(0, 0, height / 2)

    const texture = new TextureLoader().load(props.background)
    const geometry = new PlaneGeometry(width, height)
    const material = new MeshStandardMaterial({
      map: texture,
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    const ambientLight = new AmbientLight(0xffffff)
    scene.add(ambientLight)

    const tick = () => {
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    }

    tick()
  }

  return (
    <div>
      <canvas id='canvas' className={style.confirm__canvas}></canvas>
      <img src={props.background} className={style.confirm__canvas}></img>
    </div>
  )
}

export default confirm