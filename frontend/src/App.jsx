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

      const response = await fetch (SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: 'include',
          headers: {
            'Content-type' : 'application/json'
          }
        });
  
      const dataApi = await response.json();
  
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
  
      console.log('data-user', response);
  
      return dataApi;
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
  //   const isSafari = () => {
  //     const ua = navigator.userAgent.toLowerCase();
  //     return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
  //   };

  //   const requestOptions = { ...options };
  //   requestOptions.headers = { 
  //     'Content-Type': 'application/json',
  //     ...(options.headers || {})
  //   };

  //   if (isSafari()) {
  //     const token = localStorage.getItem('authToken');
  //     if (token) {
  //       requestOptions.headers.Authorization = `Bearer ${token}`;
  //     }
  //   } else {
  //     requestOptions.credentials = 'include';
  //   }

  //   const response = await fetch(url, requestOptions);
  //   return response.json();
  // };

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