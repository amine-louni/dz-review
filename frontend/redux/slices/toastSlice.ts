import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react';
import type { RootState } from '../store'



// Define the initial state using that type

type stateType = {
    open: boolean;
    autoHideDuration: number;
    message: string;
}
type payloadType = {
    open: boolean;
    autoHideDuration: number;
    message: string;
}

const initialState: stateType = {
    open: false,
    autoHideDuration: 6000,
    message: "",
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, action: PayloadAction<payloadType>) => {
            state.autoHideDuration = action.payload.autoHideDuration;
            state.message = action.payload.message;
            state.open = action.payload.open;
        },
    },
})

export const { setToast } = toastSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default toastSlice.reducer