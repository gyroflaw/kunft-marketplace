import { createAction, createReducer } from '@reduxjs/toolkit'

export interface User {
  id: string
  verified: boolean
  emailVerified: boolean
  name?: string
  publicKey: string
  avatar?: string
  role: 'user' | 'admin'
}

interface UserState {
  user?: User
}

const initialState: UserState = {
  user: undefined,
}

export const setUser = createAction<User | undefined>('USER:SET_USER')

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload
  })
})

export default userReducer
