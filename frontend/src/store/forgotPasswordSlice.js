// forgotPasswordSlice.js
import { createSlice } from '@reduxjs/toolkit';

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        loading: false,
        success: false,
        error: null,
        message: '',
    },
    reducers: {
        forgotPasswordRequest(state) {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        forgotPasswordSuccess(state, action) {
            state.loading = false;
            state.success = true;
            state.message = action.payload;
        },
        forgotPasswordFailure(state, action) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
    },
});

export const {
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
