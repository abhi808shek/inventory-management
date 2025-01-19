import { combineReducers } from "@reduxjs/toolkit";
import dynamictableHeader from "@/store/dynamicTable/dynamic-table-reducer";
import roles from "@/store/roles/roles-reducer";
import userReducer from "@/store/user/user-reducer";
import itemReducer from "@/store/items/item-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  dynamictableHeader,
  roles,
  itemReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
