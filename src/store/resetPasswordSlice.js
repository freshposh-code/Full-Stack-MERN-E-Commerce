// resetPasswordSlice.js
import { createSlice } from '@reduxjs/toolkit';

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: {
        loading: false,
        success: false,
        error: null,
        message: '',
    },
    reducers: {
        resetPasswordRequest(state) {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        resetPasswordSuccess(state, action) {
            state.loading = false;
            state.success = true;
            state.message = action.payload;
        },
        resetPasswordFailure(state, action) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
    },
});

export const {
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
