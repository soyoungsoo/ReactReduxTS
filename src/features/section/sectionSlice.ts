import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {MediaSectionType} from "../../models/media";

const initialState: MediaSectionType[] = [];

export const sectionSlice = createSlice({
    name: 'section',
    initialState,
    reducers: {
        setSection: (state, action: PayloadAction<MediaSectionType[]>) => {
            return [...action.payload];
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSection } = sectionSlice.actions

export default sectionSlice.reducer