import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/types/user";

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginChallenge: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<Partial<any>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
      state.error = null;
      state.isLoading = false;
    },

    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearAuth: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  loginChallenge,
  loginRequest,
  loginSuccess,
  loginFailure,
  updateUserSuccess,
  updateUserFailure,
  updateUserRequest,
  clearAuth,
} = userSlice.actions;

export default userSlice.reducer;
