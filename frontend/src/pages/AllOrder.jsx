import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'
import { useDispatch } from 'react-redux'
import { setLoading } from '../store/loadingSlice'
import { makeAuthenticatedRequest } from '../helpers/AuthenticatedRequest'

const AllOrder = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    const fetchOrderDetails = async () => {
        dispatch(setLoading(true))
        const response = await makeAuthenticatedRequest(
            SummaryApi.allOrder.url, 
            SummaryApi.allOrder.method,
        )

        dispatch(setLoading(false))

        setData(response.data)
        console.log("order list", response)
    }

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    return (
        <div className='h-[calc(100vh-190px)] overflow-y-scroll relative'>
            {
                !data[0] && (
                    <p className='flex justify-center items-center min-h-screen text-xl font-extrabold'>No Order available</p>
                )
            }

            <div className='overflow-y-hidden p-4'>
                {
                    data.map((item, index) => {
                        return (
                            <div key={item.userId + index} className='my-3'>
                                {
                                    <div className='font-bold absolute top-0'>
                                        NO_ of orders: {data.length + []}
                                    </div>
                                }
                                <p className='font-extrabold sm:text-lg text-base'>{moment(item.createdAt).format('LL')}</p>
                                <div className='border-2 rounded p-2'>
                                    <div className='flex flex-col lg:flex-row justify-between'>
                                        <div>
                                            {
                                                item?.productDetails.map((product, index) => {
                                                    return (
                                                        <div key={product.productId + index} className='flex sm:flex-row flex-col gap-3 bg-slate-100 border-4 p-3'>
                                                            <img
                                                                src={product.image[0]}
                                                                className='sm:w-28 w-20 sm:h-28 h-20 sm-3 m-0 bg-slate-200 object-cover'
                                                            />
                                                            <div>
                                                                <div className='font-medium sm:text-lg text-base text-ellipsis line-clamp-1'>{product.name}</div>
                                                                <div className='flex items-center gap-5 mt-3'>
                                                                    <div className='sm:text-lg text-xs text-red-500'>{displayINRCurrency(product.price)}</div>
                                                                    <p>Quantity : {product.quantity}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='flex flex-col gap-4 p-2 md:min-w-[250px] min-w-[170px]'>
                                            <div>
                                                <div className='sm:text-lg text-base font-bold'>Payment Details : </div>
                                                <p className=' ml-1 sm:text-lg text-sm'>Payment method : {item.paymentDetails.payment_method_type[0]}</p>
                                                <p className=' ml-1 sm:text-lg text-sm'>Payment Status : {item.paymentDetails.payment_status}</p>
                                            </div>
                                            <div>
                                                <div className='font-bold sm:text-lg text-sm'>Shipping Details :</div>
                                                {
                                                    item.shipping_options.map((shipping, index) => {
                                                        return (
                                                            <div key={shipping.shipping_rate} className=' ml-1 sm:text-lg text-sm'>
                                                                Shipping Amount : {shipping.shipping_amount}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='font-semibold ml-auto w-fit lg:text-lg'>
                                        Total Amount : {displayINRCurrency(item.totalAmount)}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllOrder