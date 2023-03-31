import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'


export const initialState = [{
  id: "stat1",   //should this work for statlist and other components as well? pros (DRY) and cons (additional renders?) - read up more on slices and redux performance
  isOpen: false,
  enabled: { title: true, data: true, subtitle: true },
  color: { title: "#1976d2", data: "#000000", subtitle: "#000000" },
  text: { title: "Sandwich", subtitle: "This Month" },
  data: { category: "", specificOption: null },
  size: { title: 22, data: 36, subtitle: 18 }
}]

const stylingAndDataSlice = createSlice({
  name: 'stylingAndData',
  initialState: initialState,

  reducers: {
    stylingComponentAdded: (state, action) => {
      state.push(action.payload)
    },
    stylingComponentDeleted: (state, action) => {
      const { id } = action.payload
      const existingComponentIndex = state.findIndex(component => component.id === id)
      if (existingComponentIndex >= 0) {
        state.splice(existingComponentIndex, 1)
      }
    },
    popperOpened: (state, action) => {
      const { id, isOpen } = action.payload
      const existingComponent = state.find(component => component.id === id)
      if (existingComponent) {
        existingComponent.isOpen = isOpen
      }
    },

    //could combine below three reducers and use type of text/enabled/size to decide which part of the object to modify. Would that be an improvement?
    textUpdated: (state, action) => {
      const { id, type, text } = action.payload
      const existingComponent = state.find(component => component.id === id)
      if (existingComponent) {
        existingComponent.text[type as keyof typeof existingComponent.text] = text //surely there's a more readable typing solution
      }
    },
    dataUpdated: (state, action) => {
      const { id, category, specificOption } = action.payload
      const existingComponent = state.find(component => component.id === id)
      if (existingComponent) {
        existingComponent.data = { category: category, specificOption: specificOption }
      }
    },
    enabledUpdated: (state, action) => {
      const { id, type, enabled } = action.payload
      const existingComponent = state.find(component => component.id === id)
      if (existingComponent) {
        existingComponent.enabled[type as keyof typeof existingComponent.enabled] = enabled
      }
    },
    sizeUpdated: (state, action) => {
      const { id, type, size } = action.payload
      const existingComponent = state.find(component => component.id === id)
      if (existingComponent) {
        existingComponent.size[type as keyof typeof existingComponent.size] = size
      }
    },
    colorUpdated: (state, action) => {
      const { id, type, color } = action.payload
      const existingComponent = state.find(component => component.id === id)
      if (existingComponent) {
        existingComponent.color[type as keyof typeof existingComponent.color] = color
      }
    },
  }
})

export const { stylingComponentAdded, stylingComponentDeleted, popperOpened, textUpdated, dataUpdated, enabledUpdated, sizeUpdated, colorUpdated } = stylingAndDataSlice.actions

export const selectStylingAndData = (state: RootState) => state.stylingAndData

export default stylingAndDataSlice.reducer