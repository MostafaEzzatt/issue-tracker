import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    addAction: (state, action) => {
      const tempAction = action.payload.action;

      const isExist = state.data.find((action) => action.id == tempAction.id);

      if (!isExist) {
        state.data = [...state.data, tempAction];
      }
    },
    updateAction: (state, action) => {
      const tempAction = action.payload.action;

      const newState = state.data.map((action) => {
        if (action.id == tempAction.id) {
          return tempAction;
        }

        return action;
      });

      state.data = newState;
    },
    deleteAction: (state, action) => {
      const tempAction = action.payload.action;

      const newState = state.data.filter(
        (action) => action.id !== tempAction.id
      );

      state.data = newState;
    },
  },
});

export const { addAction, updateAction, deleteAction } = actionsSlice.actions;

export default actionsSlice.reducer;
