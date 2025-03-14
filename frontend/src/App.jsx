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
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      // Helper function to check if browser is Safari
      const isSafari = () => {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
      };
  
      let response;
      
      if (isSafari()) {
        // Safari approach - use Authorization header
        const token = localStorage.getItem('authToken');
        response = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        // Standard approach for other browsers - use cookies
        response = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: 'include'
        });
      }
  
      const dataApi = await response.json();
  
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
  
      console.log('data-user', response);
  
      return dataApi;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return { success: false, error: true, message: 'Failed to fetch user details' };
    }
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