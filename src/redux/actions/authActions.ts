import { makeRequest, publicRequest } from "@/utils/makeRequest";
import { toast } from "sonner";
import {
  clearAuth,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
} from "../slices/authSlices";
import type { AppDispatch } from "../store";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { queryClient } from "@/services/queryClient";

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    const res = await publicRequest.post("/auth/logout");
    if (res) {
      dispatch(clearAuth());
      queryClient.clear();
      // toast.success("Logged out successfully");
    }
  } catch (error) {
    dispatch(clearAuth());
  }
};

export const updateUser = (data: any) => async (dispatch: AppDispatch) => {
  dispatch(updateUserRequest());
  try {
    const res = await makeRequest.put("/user/me", data);
    if (res) {
      toast.success("Your profile settings have been saved successfully.");
    }
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(updateUserFailure(error?.response?.data?.message));
    toast.error(getErrorMessage(error));
  }
};
