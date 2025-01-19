import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  addRolesObject: {},
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItemSetter: (state, action: PayloadAction<[] | any>) => {
      const payload = JSON.parse(JSON.stringify(action.payload));

      console.log("action.payload", action.payload);
      payload.items = payload.items.map((item: any) => {
        delete item["isSelected"];
        delete item["variant"];
        delete item["minLevel"];
        delete item["value"];
        return item;
      });
      payload.items = payload.items.filter((item: any) => !item.isSelected);
      return {
        ...state,
        addRolesObject: payload,
      };
    },
  },
});

export const { addItemSetter } = itemSlice.actions;
export default itemSlice.reducer;
