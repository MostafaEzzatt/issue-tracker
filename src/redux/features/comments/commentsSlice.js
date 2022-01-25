import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      const tempComment = action.payload.comment;

      const isExist = state.data.find(
        (comment) => comment.id == tempComment.id
      );

      if (!isExist) {
        state.data = [...state.data, tempComment];
      }
    },
    updateComment: (state, action) => {
      const tempComment = action.payload.comment;
      const newState = state.data.map((comment) => {
        if (comment.id == tempComment.id) {
          return tempComment;
        }

        return comment;
      });

      state.data = newState;
    },
    deleteComment: (state, action) => {
      const tempComment = action.payload.comment;
      const newState = state.data.filter(
        (comment) => comment.id !== tempComment.id
      );

      state.data = newState;
    },
  },
});

export const { addComment, updateComment, deleteComment } =
  commentsSlice.actions;

export default commentsSlice.reducer;
