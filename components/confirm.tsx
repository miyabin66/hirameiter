import { Dispatch, SetStateAction, useEffect } from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  PlaneGeometry,
  Shape,
  ExtrudeGeometry,
  BufferGeometry,
  LineBasicMaterial,
  Vector3,
  Line,
} from 'three'
import readImage from '~/scripts/readImage'
import { CANVAS, TEXTBOX } from '~/scripts/variables'
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
    canvas.width = CANVAS.width
    canvas.height = CANVAS.height

    const renderer = new WebGLRenderer({ canvas })

    const scene = new Scene()

    const camera = new PerspectiveCamera(90, CANVAS.width / CANVAS.height)
    camera.position.set(0, 0, CANVAS.height / 2)

    const ambientLight = new AmbientLight(0xffffff)
    scene.add(ambientLight)

    // トレーニング画像
    // const texture_training = await readImage(props.background)
    // const geometry_training = new PlaneGeometry(CANVAS.width, CANVAS.height)
    // const material_training = new MeshStandardMaterial({
    //   map: texture_training,
    // })
    // const mesh_training = new Mesh(geometry_training, material_training)
    // scene.add(mesh_training)

    const textboxShape = new Shape()
    textboxShape.arc(
      TEXTBOX.position.left.x,
      TEXTBOX.position.left.y,
      TEXTBOX.radius,
      (Math.PI / 6) * 3,
      -(Math.PI / 6) * 3,
      false,
    )
    textboxShape.arc(
      TEXTBOX.position.right.x,
      TEXTBOX.radius,
      TEXTBOX.radius,
      -(Math.PI / 6) * 3,
      (Math.PI / 6) * 3,
      false,
    )

    const extrudeSettings = {
      depth: 10,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    }

    const geometry_textbox = new ExtrudeGeometry(textboxShape, extrudeSettings)
    const material_textbox = new MeshStandardMaterial({
      color: '0xFFFFFF',
      opacity: 0.88,
      transparent: true,
    })
    const mesh_textbox = new Mesh(geometry_textbox, material_textbox)
    scene.add(mesh_textbox)

    const points_textboxframe = []
    const startPosition = {
      x: 0,
      y: 0,
    }
    // 左
    for (let angle = 270; angle >= 90; angle--) {
      const circleX =
        TEXTBOX.position.left.x +
        TEXTBOX.radius * Math.cos(angle * (Math.PI / 180))
      const circleY =
        TEXTBOX.position.left.y +
        TEXTBOX.radius * Math.sin(angle * (Math.PI / 180))
      if (angle === 270) {
        startPosition.x = circleX
        startPosition.y = circleY
      }
      points_textboxframe.push(new Vector3(circleX, circleY, 0))
    }
    // 右
    for (let angle = 90; angle >= -90; angle--) {
      const circleX =
        TEXTBOX.position.right.x -
        TEXTBOX.radius * 2 +
        TEXTBOX.radius * Math.cos(angle * (Math.PI / 180))
      const circleY =
        TEXTBOX.position.right.y +
        TEXTBOX.radius * Math.sin(angle * (Math.PI / 180))
      points_textboxframe.push(new Vector3(circleX, circleY, 0))
    }
    // 1周させる
    points_textboxframe.push(new Vector3(startPosition.x, startPosition.y, 0))

    const geometry_textboxframe = new BufferGeometry().setFromPoints(
      points_textboxframe,
    )
    const material_textboxframe = new LineBasicMaterial({
      color: 0x91d57c,
      linewidth: 10,
    })
    const mesh_textboxframe = new Line(
      geometry_textboxframe,
      material_textboxframe,
    )
    scene.add(mesh_textboxframe)

    renderer.render(scene, camera)
  }

  return (
    <div>
      <canvas id="canvas" className={style.confirm__canvas}></canvas>
    </div>
  )
}

export default confirm
