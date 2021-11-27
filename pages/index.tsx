import { IndexContextProvider } from '~/context/IndexContext'
import Index from '~/components/Index'

const index = (): JSX.Element => {
  return (
    <IndexContextProvider>
      <Index />
    </IndexContextProvider>
  )
}

export default index
