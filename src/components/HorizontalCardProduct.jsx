import React, { useContext, useEffect, useRef, useState } from 'react'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import Context from '../context'

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const fetchData = async () => {

        setLoading(true)
        const fetchCategoryWiseProduct = await fetch(SummaryApi.categoryWiseProduct.url, {
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                category: category
            })
        })

        const categoryProduct = await fetchCategoryWiseProduct.json()
        setLoading(false)

        console.log("horizontal data", categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleAddToCart = async (e, id) => {
        e?.stopPropagation()
        e?.preventDefault()

        const addToCart = await fetch(SummaryApi.addToCartProduct.url, {
            method: SummaryApi.addToCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    productId: id
                }
            )
        })

        const response = await addToCart.json()
        fetchUserAddToCart()

        if (response.success) {
            toast(response.message)
        }
        if (response.error) {
            toast.error(response.message)
        }

        return response
    }



    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>


            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all'>

                {loading ? (
                    loadingList.map((product, index) => {
                        return (
                            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                                </div>
                                <div className='p-4 grid w-full gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                    <div className='flex gap-3 w-full'>
                                        <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product, index) => {
                        return (
                            <Link to={"product/" + product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all' />
                                </div>
                                <div className='p-4 grid'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )

                }
            </div>


        </div>
    )
}

export default HorizontalCardProduct