import { Outlet } from 'react-router-dom'
import { Header } from './components'
import Home from './pages/Home'

const App = () => {
  return (
    <>
      <Header />
      {/* <Outlet /> */}
      <Home />
    </>
  )
}

export default App