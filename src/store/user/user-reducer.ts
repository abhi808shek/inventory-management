import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type USER_TYPE = {
  id: number;
  name: string;
  email: string;
  mobile_number: boolean;
  user_role: string;
  status: string;
  address: null | string;
  permissions: null | string;
};

type UserStateType = {
  user: null | USER_TYPE;
};

const initialState: UserStateType = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<null | USER_TYPE>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
