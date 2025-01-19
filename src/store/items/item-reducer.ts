import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  addItemObject: {},
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItemSetter: (state, action: PayloadAction<[] | any>) => {
      return {
        ...state,
        addItemObject: action.payload,
      };
    },
  },
});

export const { addItemSetter } = itemSlice.actions;
export default itemSlice.reducer;
