// ForgotPasswordComponent.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailure } from '../store/forgotPasswordSlice';
import SummaryApi from '../common/index'

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const forgotPasswordState = useSelector((state) => state.forgotPassword);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        dispatch(forgotPasswordRequest());

        try {
            const response = await fetch(SummaryApi.forgetPassword.url, {
                method: SummaryApi.forgetPassword.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(forgotPasswordSuccess(data.message));
            } else {
                dispatch(forgotPasswordFailure(data.message));
            }
        } catch (error) {
            dispatch(forgotPasswordFailure(error.message));
        }
    };

    return (
        <div className='m-5 text-center'>
            <h1 className='font-bold text-2xl'>Forgot Password?</h1>
            <div className='flex flex-col justify-center min-h-[100vh] items-center'>
                <p className='text-xl font-bold'>Please enter your email address below.</p>
                <p className='text-base font-semibold'>We'll send you a link to reset your password.</p>
                <form onSubmit={handleForgotPassword} className='flex flex-col w-full max-w-xl'>
                    <input
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className='outline-none py-4 px-3 my-5'
                    />
                    <button className='bg-red-500 w-fit m-auto px-5 py-2 text-white font-bold rounded-md hover:bg-red-400' type="submit">Submit</button>
                </form>
                {forgotPasswordState && forgotPasswordState.loading && <p>Loading... Please wait</p>}
                {forgotPasswordState && forgotPasswordState.success && <p className='text-green-700 font-bold text-lg'>{forgotPasswordState.message}</p>}
                {forgotPasswordState && forgotPasswordState.error && <p className='text-red-700 font-bold text-lg'>{forgotPasswordState.error}</p>}
            </div>
        </div>
    );
};

export default ForgetPassword;
