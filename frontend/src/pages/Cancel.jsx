import React from 'react'
import { cancel } from '../assest'
import { Link } from 'react-router-dom'

const Cancel = () => {
    return (
        <div className='flex justify-center items-center min-h-screen flex-col'>
            <div className="bg-slate-200 sm:px-28 px-20 sm:py-5 py-2">
                <img
                    src={cancel}
                    width={150}
                    height={150}
                    className='mix-blend-multiply m-auto'
                />
                <p className='text-red-600 font-extrabold sm:text-xl text-base'>Payment Cancelled</p>
                <Link to={"/cart"} className='border-2 border-red-600 text-red-600 flex justify-center py-2 px-4 mt-3 w-fit m-auto hover:bg-red-600 hover:text-white duration-200 font-bold'>Go To Cart</Link>
            </div>
        </div>
    )
}

export default Cancel