import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'

const App = () => {
  return (
    <>
      <Header />
      <main className=''>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App