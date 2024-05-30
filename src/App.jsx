import { Outlet } from 'react-router-dom'
import { Header } from './components'
import Home from './pages/Home'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Home />
      <Footer />
    </>
  )
}

export default App
