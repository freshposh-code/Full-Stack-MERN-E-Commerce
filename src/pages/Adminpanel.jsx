import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import { CiMenuKebab } from "react-icons/ci";
import { adminRoutes } from '../helpers/Data';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(1)

    const handleActiveNav = (index) => {
        setActive(index)
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    }, [user])

    return (
        <div className='min-h-[calc(100vh-120px)] flex overflow-y-hidden'>
            {/* DESKTOP/TAB VIEW */}
            <aside className='bg-white min-h-full w-full max-w-60 customShadow sm:flex hidden flex-col'>
                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>

                        <div className='text-3xl cursor-pointer relative flex justify-center'>
                            {
                                user?.profilePic ? (
                                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                                ) : (
                                    <FaRegCircleUser />
                                )
                            }
                        </div>

                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/***navigation */}
                <div>
                    <nav className='p-4 font-semibold flex flex-col'>
                        {adminRoutes.map((el, index) => (
                            <Link to={el.route} className={`${index === active ? "bg-red-600 text-white" : ""} hover:bg-red-600 hover:text-white px-2 my-2 py-2 rounded-lg`} onClick={() => handleActiveNav(index)}>{el.name}</Link>

                        ))}
                    </nav>
                </div>
            </aside >

            {/* MOBILE MENU RESPONSIVENESS */}
            < span >
                <CiMenuKebab onClick={() => setOpen((prev => !prev))} className='absolute my-5 text-3xl text-red-950 md:hidden flex z-10' />
            </span >
            <aside className={`bg-white min-h-full w-full max-w-60 customShadow sm:hidden flex flex-col ${open ? 'hidden' : 'flex'}`}>
                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>

                        <div className='text-3xl cursor-pointer relative flex justify-center'>
                            {
                                user?.profilePic ? (
                                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                                ) : (
                                    <FaRegCircleUser />
                                )
                            }
                        </div>

                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/***navigation */}
                <div>
                    <nav className='grid p-4 font-semibold' onClick={() => setOpen(!open)}>
                        {adminRoutes.map((el, index) => (
                            <Link to={el.route} className={`${index === active ? "bg-red-600 text-white" : ""} px-2 py-1 hover:bg-slate-100 sm:text-lg text-base rounded-lg my-2`} onClick={() => handleActiveNav(index)}>{el.name}</Link>
                        ))}
                    </nav>
                </div>
            </aside >

            <main className='w-full h-full p-2'>
                <Outlet />
            </main>
        </div >
    )
}

export default AdminPanel