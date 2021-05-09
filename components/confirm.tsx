import { Dispatch, SetStateAction, useEffect } from 'react'
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

type Props = {
  setScene: Dispatch<SetStateAction<string>>
  name: string
  background: string
}

const confirm = (props: Props): JSX.Element => {
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

    // トレーニング画像
    const texture_training = await readImage(props.background)
    const geometry_training = new PlaneGeometry(width, height)
    const material_training = new MeshStandardMaterial({
      map: texture_training,
    })
    const mesh_training = new Mesh(geometry_training, material_training)
    scene.add(mesh_training)

    // テキストの白背景
    const geometry_textbox = new PlaneGeometry(720, 216)
    const material_textbox = new MeshStandardMaterial({
      color: '0xFFFFFF',
      opacity: 0.88,
      transparent: true,
    })
    const mesh_textbox = new Mesh(geometry_textbox, material_textbox)
    scene.add(mesh_textbox)

    mesh_textbox.position.set(0, -400, 0)

    renderer.render(scene, camera)
  }

  return (
    <div>
      <canvas id="canvas" className={style.confirm__canvas}></canvas>
    </div>
  )
}

export default confirm
