import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export type UserRole = 'admin' | 'editor' | 'viewer'

export interface UserAccount {
  id: string
  name: string
  email: string
  role: UserRole
  title: string
}

interface AuthState {
  currentUserId: string
  users: UserAccount[]
}

const seedUsers: UserAccount[] = [
  {
    id: 'u-admin',
    name: 'Amelia Chen',
    email: 'amelia.chen@example.com',
    role: 'admin',
    title: 'Director of Operations',
  },
  {
    id: 'u-editor',
    name: 'Kevin',
    email: 'david.patel@example.com',
    role: 'editor',
    title: 'Business Analyst',
  },
  {
    id: 'u-viewer',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@example.com',
    role: 'viewer',
    title: 'Finance Associate',
  },
]

const initialState: AuthState = {
  currentUserId: seedUsers[0]?.id ?? '',
  users: seedUsers,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchUser: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload
    },
  },
})

export const { switchUser } = authSlice.actions

export const selectUsers = (state: RootState) => state.auth.users

export const selectCurrentUser = (state: RootState) =>
  state.auth.users.find((user) => user.id === state.auth.currentUserId) ?? state.auth.users[0]

export const selectCurrentRole = (state: RootState): UserRole => selectCurrentUser(state).role

export default authSlice.reducer
