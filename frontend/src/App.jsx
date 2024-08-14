import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Loader from './components/Loader';


const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }

    console.log('data-user', dataResponse)

    // setCartProductCount(dataApi?.data?.count)
  }

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    console.log('add to cart product', dataApi)

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

  }, [])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, fetchUserAddToCart, cartProductCount
      }}>
        <ToastContainer position='top-center' />
        <Header />
        <main className='pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
      <Loader />
    </>
  )
}

export default App