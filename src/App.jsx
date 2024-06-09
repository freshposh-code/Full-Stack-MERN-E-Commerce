import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className='pt-16'>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default App