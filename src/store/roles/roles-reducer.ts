import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  addRolesObject: null,
  roleName: "",
  roleIdList: [],
  permissions: [],
};

export const dynamicTableHeaderSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    addRolesSetter: (state, action: PayloadAction<[] | any>) => {
      return {
        ...state,
        addRolesObject: action.payload,
      };
    },
    roleNameSetter: (state, action: PayloadAction<[] | any>) => {
      return {
        ...state,
        roleName: action.payload,
      };
    },

    roleIdListSetter: (state, action: PayloadAction<[] | any>) => {
      return {
        ...state,
        permissions: action.payload,
        roleIdList: action.payload,
      };
    },
  },
});

export const { addRolesSetter, roleNameSetter, roleIdListSetter } =
  dynamicTableHeaderSlice.actions;
export default dynamicTableHeaderSlice.reducer;
