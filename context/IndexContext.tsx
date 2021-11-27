import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { Scene } from '~/interfaces/enums'

interface TypeContext {
  scene: Scene
  setScene: Dispatch<SetStateAction<Scene>>
  name: string
  setName: Dispatch<SetStateAction<string>>
  isTopScene: boolean
  setIsTopScene: Dispatch<SetStateAction<boolean>>
  background: string
  setBackground: Dispatch<SetStateAction<string>>
  complete: string
  setComplete: Dispatch<SetStateAction<string>>
}

const defaultValues: TypeContext = {
  scene: Scene.top,
  setScene: () => {
    // 何もしない
  },
  name: '',
  setName: () => {
    // 何もしない
  },
  isTopScene: true,
  setIsTopScene: () => {
    // 何もしない
  },
  background: '',
  setBackground: () => {
    // 何もしない
  },
  complete: '',
  setComplete: () => {
    // 何もしない
  },
}

const IndexContext = createContext(defaultValues)

const IndexContextProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const [scene, setScene] = useState<Scene>(defaultValues.scene)
  const [name, setName] = useState<string>(defaultValues.name)
  const [isTopScene, setIsTopScene] = useState<boolean>(
    defaultValues.isTopScene,
  )
  const [background, setBackground] = useState<string>(defaultValues.background)
  const [complete, setComplete] = useState<string>(defaultValues.complete)

  const value: TypeContext = {
    scene,
    setScene,
    name,
    setName,
    isTopScene,
    setIsTopScene,
    background,
    setBackground,
    complete,
    setComplete,
  }

  return <IndexContext.Provider value={value}>{children}</IndexContext.Provider>
}

const useIndexContext = (): TypeContext => useContext(IndexContext)

export { useIndexContext, IndexContextProvider }
