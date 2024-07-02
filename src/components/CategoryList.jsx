import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { setLoading } from '../store/loadingSlice'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)
    // const dispatch = useDispatch()

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async () => {
        // dispatch(setLoading(true))
        setLoading(true)

        const response = await fetch(SummaryApi.categoryProduct.url)

        const dataResponse = await response.json()
        // dispatch(setLoading(false))
        setLoading(false)
        setCategoryProduct(dataResponse.data)

        console.log(dataResponse)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    return (
        <div className='mx-auto p-6'>
            <div className='flex items-center gap-6 justify-between overflow-scroll scrollbar-none'>
                {

                    loading ? (
                        categoryLoading.map((el, index) => {
                            return (
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}>
                                </div>
                            )
                        })
                    ) : (

                        categoryProduct.map((product) => {
                            return <Link to={"/product-category?category=" + product?.category} className='cursor-pointer' key={product?.category}>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>

                        })

                    )
                }
            </div>
        </div>
    )
}

export default CategoryList