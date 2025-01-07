import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/store/user/user-reducer";
import dynamictableHeader from "@/store/dynamicTable/dynamic-table-reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  dynamictableHeader,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
