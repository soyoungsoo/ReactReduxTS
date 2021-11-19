import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {MemberType} from "../../models/member";

const initialState: MemberType = {} as MemberType;

export const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setMember: (state, action: PayloadAction<MemberType>) => {
            return action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setMember } = memberSlice.actions

export default memberSlice.reducer