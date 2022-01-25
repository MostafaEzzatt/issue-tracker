import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      const tempProject = action.payload.project;
      const isExist = state.data.find(
        (project) => project.id == tempProject.id
      );

      if (!isExist) {
        state.data = [tempProject, ...state.data];
      }
    },
    updateProject: (state, action) => {
      const tempProject = action.payload.project;
      const newState = state.data.map((project) => {
        if (project.id == tempProject.id) {
          return tempProject;
        }

        return project;
      });

      state.data = newState;
    },
    deleteProject: (state, action) => {
      const tempProject = action.payload.project;
      const newState = state.data.filter(
        (project) => project.id !== tempProject.id
      );

      state.data = newState;
    },
  },
});

export const { addProject, updateProject, deleteProject } =
  projectSlice.actions;

export default projectSlice.reducer;
