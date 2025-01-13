import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  dynamicTableArchitecture: [],
  dynamictableHeader: [],
  dynamicTableData: [],
};

export const dynamicTableHeaderSlice = createSlice({
  name: "dynamictableHeader",
  initialState,
  reducers: {
    dynamicTableArchitectureList: (state, action: PayloadAction<[] | any>) => {
      return {
        ...state,
        dynamicTableArchitecture: action.payload,
      };
    },
    dynamicTableHeaderList: (state, action: PayloadAction<[] | any>) => {
      return {
        ...state,
        dynamictableHeader: action.payload,
      };
    },
    dynamicTableDataList: (state, action: PayloadAction<[] | any>) => {
      return {
        ...state,
        dynamicTableData: action.payload,
      };
    },
  },
});

export const {
  dynamicTableHeaderList,
  dynamicTableDataList,
  dynamicTableArchitectureList,
} = dynamicTableHeaderSlice.actions;
export default dynamicTableHeaderSlice.reducer;
