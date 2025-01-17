import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import imagePosh64 from '../helpers/imagePosh64'
import SummaryApi from '../common'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { setLoading } from '../store/loadingSlice'

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();

    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
    });

    const navigate = useNavigate();

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        const imagePic = await imagePosh64(file)

        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic
            }
        })
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true))

        if (data.password === data.confirmPassword) {

            const dataResponse = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json();
            dispatch(setLoading(false))

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            }

            if (dataApi.error) {
                toast.error(dataApi.message)
            }

        } else {
            toast.error("Please check password and confirm password")
        }
    };

    return (
        <section id='signup'>

            <div className='sm:pt-16 pt-0 flex justify-center items-center min-h-screen'>

                <div className='bg-white p-5 w-full max-w-sm rounded-md'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcons} alt='login icons' />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                    Upload  Photo
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadPic} />
                            </label>
                        </form>
                    </div>


                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name</label>
                            <div className='bg-slate-100 p-2 rounded-md'>
                                <input
                                    type='text'
                                    placeholder='enter name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Email</label>
                            <div className='bg-slate-100 p-2 rounded-md'>
                                <input
                                    type='email'
                                    placeholder='enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label>Password</label>
                            <div className='bg-slate-100 p-2 rounded-md flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div>
                            <label>Confirm Password</label>
                            <div className='bg-slate-100 p-2 rounded-md flex'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='enter confirm password'
                                    value={data.confirmPassword}
                                    name='confirmPassword'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>

                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign up</button>

                    </form>

                    <p className='my-5'>Already have an account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign in</Link></p>
                </div>


            </div>
        </section>
    )
}

export default SignUp