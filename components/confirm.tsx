import { Dispatch, SetStateAction, useEffect } from 'react'
import {
  WebGLRenderer,
  Scene,
  Color,
  PerspectiveCamera,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  PlaneGeometry,
  Shape,
  ExtrudeGeometry,
} from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import readImage from '~/scripts/readImage'
import { CANVAS, TEXTBOX, SAMPLE } from '~/scripts/variables'
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

    const renderer = new WebGLRenderer({ canvas, alpha: true })

    const scene = new Scene()
    scene.background = new Color(0xff0000)

    const camera = new PerspectiveCamera(90, CANVAS.width / CANVAS.height)
    camera.position.set(0, 0, CANVAS.height / 2)

    const ambientLight = new AmbientLight(0xffffff)
    scene.add(ambientLight)

    // トレーニング画像
    const texture_training = await readImage(SAMPLE) // props.background
    const geometry_training = new PlaneGeometry(CANVAS.width, CANVAS.height)
    const material_training = new MeshStandardMaterial({
      map: texture_training,
    })
    const mesh_training = new Mesh(geometry_training, material_training)
    scene.add(mesh_training)

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
      depth: 1,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 1,
      bevelThickness: 1,
    }

    const geometry_textbox = new ExtrudeGeometry(textboxShape, extrudeSettings)
    const material_textbox = new MeshStandardMaterial({
      color: 0xffffff,
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
    for (let angle = 270; angle >= 90; angle -= 0.0005) {
      const circleX =
        TEXTBOX.position.left.x +
        3 +
        (TEXTBOX.radius + 3) * Math.cos(angle * (Math.PI / 180))
      const circleY =
        TEXTBOX.position.left.y +
        (TEXTBOX.radius + 3) * Math.sin(angle * (Math.PI / 180))
      if (angle === 270) {
        startPosition.x = circleX
        startPosition.y = circleY
      }
      points_textboxframe.push(circleX, circleY, 3)
    }
    // 右
    for (let angle = 90; angle >= -90; angle -= 0.0005) {
      const circleX =
        TEXTBOX.position.right.x +
        3 -
        (TEXTBOX.radius + 3) * 2 +
        (TEXTBOX.radius + 3) * Math.cos(angle * (Math.PI / 180))
      const circleY =
        TEXTBOX.position.right.y +
        (TEXTBOX.radius + 3) * Math.sin(angle * (Math.PI / 180))
      points_textboxframe.push(circleX, circleY, 3)
    }
    // 1周させる
    points_textboxframe.push(startPosition.x, startPosition.y, 3)

    const geometry_textboxframe = new LineGeometry()
    geometry_textboxframe.setPositions(points_textboxframe)
    const material_textboxframe = new LineMaterial({
      color: 0x91d57c,
      linewidth: 0.006,
      alphaTest: 1.0,
    })
    const mesh_textboxframe = new Line2(
      geometry_textboxframe,
      material_textboxframe,
    )
    scene.add(mesh_textboxframe)

    const canvas_text = document.createElement('canvas')
    canvas_text.width = 500
    canvas_text.height = 200
    const ctx_text = canvas_text.getContext('2d')
    ctx_text.beginPath()
    ctx_text.clearRect(0, 0, 500, 200)
    ctx_text.font = '25px NewRodinPro-B'
    ctx_text.fillStyle = '#764724'
    ctx_text.fillText(props.name, 0, 60)
    document.body.appendChild(canvas_text)
    const texture_text = await readImage(canvas_text.toDataURL('image/png'))
    const geometry_text = new PlaneGeometry(
      canvas_text.width,
      canvas_text.height,
    )
    const material_text = new MeshStandardMaterial({
      color: 0xffffff,
      map: texture_text,
      transparent: true,
      depthTest: false,
    })
    const mesh_text = new Mesh(geometry_text, material_text)
    mesh_text.position.set(0, -400, 3)
    scene.add(mesh_text)

    renderer.render(scene, camera)
  }

  return (
    <div>
      <p>完成</p>
      <canvas id="canvas" className={style.confirm__canvas}></canvas>
    </div>
  )
}

export default confirm
