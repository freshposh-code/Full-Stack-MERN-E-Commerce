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
import { makeAuthenticatedRequest } from './helpers/AuthenticatedRequest';


const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {

      const response = await makeAuthenticatedRequest (
        SummaryApi.current_user.url,
        SummaryApi.current_user.method,
        );
  
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
  
      console.log('data-user', response);
  
      return dataApi;
  }

  const fetchUserAddToCart = async () => {
    const dataResponse = await makeAuthenticatedRequest(
      SummaryApi.addToCartProductCount.url, 
      SummaryApi.addToCartProductCount.method,
    )

    console.log('add to cart product', dataResponse)

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    fetchUserDetails()
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