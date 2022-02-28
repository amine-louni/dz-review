import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../@types';
import type { RootState } from '../store'

// Define a type for the slice state


// Define the initial state using that type

type stateType = {
    accessToken: string | null,
    userData: IUser | null,
}
type payloadType = {
    accessToken: string | null,
    data: IUser | null,
}

const initialState: stateType = {
    accessToken: null,
    userData: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<payloadType>) => {
            state.accessToken = action.payload.accessToken;
            state.userData = action.payload.data
        },
    },
})

export const { setUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer