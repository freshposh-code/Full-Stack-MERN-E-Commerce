import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import LoadingReducer from './loadingSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        loading: LoadingReducer
    },
})

export default store