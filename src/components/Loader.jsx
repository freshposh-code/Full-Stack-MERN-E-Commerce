// Loader.js
import React from 'react';
import { useSelector } from 'react-redux';

const Loader = () => {
    const isLoading = useSelector((state) => state.loading);

    if (!isLoading) {
        return null;
    }

    return (
        <div className='fixed w-full h-screen top-0 bg-[#ffffff86] grid place-items-center z-20'>
            <span className="loader"></span>
        </div>
    )
};

export default Loader;
