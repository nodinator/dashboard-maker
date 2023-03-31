import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

const serverSlice = createSlice({
  name: 'server',
  initialState: [] as any,
  reducers: {

    serverUpdated: (state, action) => {
      return action.payload
    },

  }
})

export const { serverUpdated, } = serverSlice.actions

export const selectServer = (state: RootState) => state.server

export default serverSlice.reducer