import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  addRolesObject: null,
  roleName: "",
  roleIdList: [],
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
      const roleIndex = state.roleIdList?.findIndex(
        (item: any) => item === action.payload
      );
      if (roleIndex >= 0) {
        const filteredRoleList = state.roleIdList?.filter(
          (item: any) => item !== action.payload
        );
        return { ...state, roleIdList: filteredRoleList };
      } else {
        return {
          ...state,
          roleIdList: [action.payload, ...state.roleIdList],
        };
      }
    },
  },
});

export const { addRolesSetter, roleNameSetter, roleIdListSetter } =
  dynamicTableHeaderSlice.actions;
export default dynamicTableHeaderSlice.reducer;
