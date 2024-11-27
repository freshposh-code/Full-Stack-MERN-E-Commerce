import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { swiperImages } from '../helpers/Data';


const BannerProduct = () => {

    return (
        <>
            <div className="sm:mx-7 mx-2">
                <Swiper
                    // navigation={true}
                    pagination={true}
                    keyboard={true}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                    }}
                    modules={[Navigation, Pagination, Keyboard, Autoplay]}
                >
                    {swiperImages.map((el) => (
                        <SwiperSlide key={el.image}>
                            <img src={el.image} alt="banner" className='w-full sm:h-[30rem] h-28 object-cover' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default BannerProduct