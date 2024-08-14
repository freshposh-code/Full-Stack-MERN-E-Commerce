import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import LoadingReducer from './loadingSlice';
import forgotPasswordReducer from './forgotPasswordSlice'
import resetPasswordReducer from './resetPasswordSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        loading: LoadingReducer,
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
    },
})

export default store