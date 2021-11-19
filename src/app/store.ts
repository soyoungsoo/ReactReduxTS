import { configureStore } from '@reduxjs/toolkit'
import sectionReducer from '../features/section/sectionSlice'
import memberReducer from '../features/member/memberSlice'

export const store = configureStore({
	reducer: {
		section: sectionReducer,
		member: memberReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch