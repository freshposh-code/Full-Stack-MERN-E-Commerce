import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/loadingSlice'

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    })
    const dispatch = useDispatch();

    const fetchAllUsers = async () => {

        dispatch(setLoading(true))

        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json();
        dispatch(setLoading(false))

        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }

    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <div className='bg-white pb-4'>
            <div className="table-responsive">
                <table className='w-full userTable'>
                    <thead>
                        <tr className='bg-black text-white'>
                            <th>Sr.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser.map((el, index) => {
                                return (
                                    <tr key={index}>
                                        <td data-label="Sr.">{index + 1}</td>
                                        <td data-label="Name">{el?.name}</td>
                                        <td data-label="Email">{el?.email}</td>
                                        <td data-label="Role">{el?.role}</td>
                                        <td data-label="Created Date">{moment(el?.createdAt).format('LL')}</td>
                                        <td data-label="Action">
                                            <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                                onClick={() => {
                                                    setUpdateUserDetails(el)
                                                    setOpenUpdateRole(true)
                                                }}
                                            >
                                                <MdModeEdit />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>

            </div>

            {
                openUpdateRole && (
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fetchAllUsers}
                    />
                )
            }
        </div>
    )
}

export default AllUsers