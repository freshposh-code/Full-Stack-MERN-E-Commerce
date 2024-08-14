import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'
import { useDispatch } from 'react-redux'
import { setLoading } from '../store/loadingSlice'

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const dispatch = useDispatch()

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")

    const fetchData = async () => {
        dispatch(setLoading(true))
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        })

        const dataResponse = await response.json()
        dispatch(setLoading(false))
        setData(dataResponse?.data || [])

        console.log("CategoryProduct", dataResponse)
    }

    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target

        setSelectCategory((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null
        }).filter(el => el)

        setFilterCategoryList(arrayOfCategory)

        //format for url change when change on the checkbox
        const urlFormat = arrayOfCategory.map((el, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${el}`
            }
            return `category=${el}&&`
        })

        navigate("/product-category?" + urlFormat.join(""))
    }, [selectCategory])


    const handleOnChangeSortBy = (e) => {
        const { value } = e.target

        setSortBy(value)

        if (value === 'asc') {
            setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice))
        }

        if (value === 'dsc') {
            setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice))
        }
    }

    useEffect(() => {

    }, [sortBy])

    return (
        <div className='p-4'>

            {/***desktop version */}
            <div className='flex lg:flex-row flex-col'>
                {/***left side */}
                <div className='bg-white p-2'>
                    {/**sort by */}
                    <div className='w-48'>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                                <label>Price - Low to High</label>
                            </div>

                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>


                    {/**filter by */}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {
                                productCategory.map((categoryName, index) => {
                                    return (
                                        <div className='flex items-center gap-3'>
                                            <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>


                </div>


                {/***right side ( product ) */}
                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

                    <div className=''>
                        {
                            data.length !== 0 && setLoading && (
                                <VerticalCard Loading={setLoading} fetchProductData={data} style='md:gap-3 gap-3' />
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CategoryProduct