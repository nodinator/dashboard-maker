import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

const layoutSlice = createSlice({
  name: 'layout',
  initialState: [] as { i: string, x: number, y: number, w: number, h: number }[],
  reducers: {
    layoutAdded: (state, action) => {
      state.push(action.payload)
    },
    layoutUpdated: (state, action) => {
      return action.payload
    },
    layoutComponentDeleted: (state, action) => {
      const { id } = action.payload
      const existingComponentIndex = state.findIndex(component => component.i === id)
      if (existingComponentIndex >= 0) {
        state.splice(existingComponentIndex, 1)
      }
    }
  }
})

export const { layoutAdded, layoutUpdated, layoutComponentDeleted } = layoutSlice.actions

export const selectLayout = (state: RootState) => state.layout

export default layoutSlice.reducer