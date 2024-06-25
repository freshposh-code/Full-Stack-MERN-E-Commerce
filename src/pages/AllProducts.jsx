import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import AdminProductCard from '../components/AdminProductCard'
import SummaryApi from '../common'

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([])

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url)
        const dataResponse = await response.json()

        console.log("product data", dataResponse)

        setAllProduct(dataResponse?.data || [])
    }

    useEffect(() => {
        fetchAllProduct()
    }, [])

    const handleProductUpload = (newProduct) => {
        setAllProduct((prevProducts) => [newProduct, ...prevProducts])
    }

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Product</h2>
                <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
            </div>

            {/**all product */}
            <div className='flex items-center flex-wrap gap-4 py-4 h-[calc(100vh-200px)] overflow-y-scroll'>
                {
                    allProduct.map((product, index) => {
                        return (
                            <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
                        )
                    })
                }
            </div>


            {/**upload prouct component */}
            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setOpenUploadProduct(false)} onUpload={handleProductUpload} />
                )
            }
        </div>
    )
}

export default AllProducts