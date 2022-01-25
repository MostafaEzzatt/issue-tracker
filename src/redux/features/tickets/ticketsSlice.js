import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      const tempTicket = action.payload.ticket;
      const isExist = state.data.find((ticket) => ticket.id == tempTicket.id);

      if (!isExist) {
        state.data = [tempTicket, ...state.data];
      }
    },
    updateTicket: (state, action) => {
      const tempTicket = action.payload.ticket;

      const newState = state.data.map((ticket) => {
        if (ticket.id == tempTicket.id) {
          return tempTicket;
        }

        return ticket;
      });

      state.data = newState;
    },
    deleteTicket: (state, action) => {
      const tempTicket = action.payload.ticket;
      const newState = state.data.filter(
        (ticket) => ticket.id !== tempTicket.id
      );

      state.data = newState;
    },
  },
});

export const { addTicket, updateTicket, deleteTicket } = ticketsSlice.actions;

export default ticketsSlice.reducer;
