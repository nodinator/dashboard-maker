import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

const layoutSlice = createSlice({
  name: 'layout',
  initialState: { value: [{ i: "movable", x: 0, y: 1.3, w: 4, h: 3, }] }, //I think this item isn't ever actually rendering?
  reducers: {
    addComponent: (state, action) => { //action.type = 'layout/componentAdded'
      //action.payload = '{ i: "movable", x: 0, y: 1.3, w: 4, h: 3, }'
      state.value.push(action.payload)
    },
    updateLayout: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { addComponent, updateLayout } = layoutSlice.actions

export const selectLayout = (state: RootState) => state.layout.value

export default layoutSlice.reducer