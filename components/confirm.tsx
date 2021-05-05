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
  DirectionalLight
} from 'three'

const confirm = (props) => {
  useEffect(() => {
    window.addEventListener('load', init)
  })

  const canvas = useRef(null)

  const init = () => {
    const width = 750
    const height = 1334

    const renderer = new WebGLRenderer({canvas})
    renderer.setSize(width, height)

    const scene = new Scene()

    const camera = new PerspectiveCamera(45, width / height)
    camera.position.set(0, 0, 10)

    const geometry = new PlaneGeometry(1, 1)
    const texture = new TextureLoader().load(props.background)
    const material = new MeshStandardMaterial({
      map: texture,
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    const directionalLight = new DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // レンダリング
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    }
  }

  return (
    <canvas ref={canvas}></canvas>
  )
}

export default confirm