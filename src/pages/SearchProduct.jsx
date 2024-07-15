import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'
import { useDispatch } from 'react-redux'
import { setLoading } from '../store/loadingSlice'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    console.log("query", query.search)

    const fetchProduct = async () => {
        dispatch(setLoading(true))
        const response = await fetch(SummaryApi.searchProduct.url + query.search)
        const dataResponse = await response.json()
        dispatch(setLoading(false))

        setData(dataResponse.data)
    }

    useEffect(() => {
        fetchProduct()
    }, [query])

    return (
        <div className='container mx-auto p-4'>
            {/* {
                setLoading && (
                    <p className='text-lg text-center'>Loading ...</p>
                )
            } */}

            <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

            {
                data.length === 0 && !setLoading && (
                    <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
                )
            }


            {
                data.length !== 0 && setLoading && (
                    <VerticalCard Loading={setLoading} fetchProductData={data} style='md:gap-12 gap-3' />
                )
            }

        </div>
    )
}

export default SearchProduct