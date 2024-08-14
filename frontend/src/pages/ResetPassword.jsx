import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure } from '../store/resetPasswordSlice';
import SummaryApi from '../common/index';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const resetPasswordState = useSelector((state) => state.resetPassword);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [confirmPasswordOpen, setConfirmPasswordOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        if (token) {
            setToken(token);
        }
    }, [location.search]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            dispatch(resetPasswordFailure("Passwords do not match"));
            return;
        }

        dispatch(resetPasswordRequest());

        try {
            const response = await fetch(SummaryApi.resetPassword.url, {
                method: SummaryApi.resetPassword.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(resetPasswordSuccess(data.message));
            } else {
                dispatch(resetPasswordFailure(data.message));
            }
        } catch (error) {
            dispatch(resetPasswordFailure(error.message));
        }
    };

    return (
        <div className='m-5 text-center'>
            <h1 className='font-bold text-2xl'>Reset Password</h1>

            <div className='flex flex-col justify-center min-h-[100vh] items-center'>
                <form onSubmit={handleResetPassword} className='flex flex-col w-full max-w-xl'>
                    <div className='flex justify-between items-center w-full border bg-white my-2'>
                        <input
                            type={passwordOpen ? "password" : "text"}
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            className='outline-none py-4 px-3 w-full bg-transparent'
                        />
                        <div className='cursor-pointer text-xl p-2' onClick={() => setPasswordOpen(prev => !prev)}>
                            {passwordOpen ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>

                    <div className='flex justify-between items-center w-full border bg-white my-2'>
                        <input
                            type={confirmPasswordOpen ? "password" : "text"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            className='outline-none py-4 px-3'
                        />
                        <div className='cursor-pointer text-xl p-2' onClick={() => setConfirmPasswordOpen(prev => !prev)}>
                            {confirmPasswordOpen ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>

                    <button className='bg-red-500 w-fit m-auto px-5 py-2 text-white font-bold rounded-md hover:bg-red-400 my-2' type="submit">Submit</button>
                </form>
                {resetPasswordState && resetPasswordState.loading && <p>Loading... Please wait</p>}
                {resetPasswordState && resetPasswordState.success && <p className='text-green-700 font-bold text-lg'>{resetPasswordState.message}</p>}
                {resetPasswordState && resetPasswordState.error && <p className='text-red-700 font-bold text-lg'>{resetPasswordState.error}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
