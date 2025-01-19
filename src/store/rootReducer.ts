import { combineReducers } from "@reduxjs/toolkit";
import dynamictableHeader from "@/store/dynamicTable/dynamic-table-reducer";

import roles from "@/store/roles/roles-reducer";

import userReducer from "@/store/user/user-reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  dynamictableHeader,
  roles,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
