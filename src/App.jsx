import Routes from './routes'
import { TokenProvider } from './context/TokenContext'

function App() {
  return (
    <TokenProvider>
      <Routes />
    </TokenProvider>
  )
}

export default App
