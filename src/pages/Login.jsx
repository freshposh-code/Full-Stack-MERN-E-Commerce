import React from 'react'
import loginIcons from '../assest/signin.gif'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

const Login = () => {
    return (
        <section id='login'>
            <div className='flex justify-center min-h-screen items-center'>

                <div className='bg-[#bcbcbc3c] p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons' />
                    </div>

                    <form className='pt-6 flex flex-col gap-2'>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-white p-2'>
                                <input
                                    type='email'
                                    placeholder='enter email'
                                    name='email'
                                    // value={data.email}
                                    // onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label>Password : </label>
                            <div className='bg-white p-2 flex'>
                                <input
                                    // type={showPassword ? "text" : "password"}
                                    placeholder='enter password'
                                    // value={data.password}
                                    name='password'
                                    // onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl'>
                                    <span>

                                        <FaEyeSlash />

                                        {/* <FaEye /> */}

                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password ?
                            </Link>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

                    </form>

                    <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
                </div>


            </div>
        </section>
    )
}

export default Login