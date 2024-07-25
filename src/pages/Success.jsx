import React from 'react'
import { success } from '../assest/index'
import { Link } from 'react-router-dom'

const Success = () => {
    return (
        <div className='flex justify-center items-center min-h-screen flex-col'>
            <div className="bg-slate-200 sm:px-28 px-20 sm:py-5 py-2">
                <img
                    src={success}
                    width={150}
                    height={150}
                    className='m-auto'
                />
                <p className='text-green-600 sm:text-xl text-base font-extrabold'>Payment Successful</p>
                <Link to={"/order"} className='border-2 border-green-600 flex justify-center py-2 px-4 mt-3 w-fit m-auto hover:bg-green-600 text-green-600 hover:text-white duration-200 font-bold'>See Order</Link>
            </div>
        </div>
    )
}

export default Success