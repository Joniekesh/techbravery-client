import { publicRequest } from "@/utils/makeRequest";
import {
  projectFeaturesFailure,
  projectFeaturesRequest,
  projectFeaturesSuccess,
} from "../slices/quoteSlices";
import { AppDispatch } from "../store";

export const fetchProjectFeatures = () => async (dispatch: AppDispatch) => {
  dispatch(projectFeaturesRequest());
  try {
    const res = await publicRequest.get("/quote");
    console.log("RESPONSE FROM ACTION", res.data);
    dispatch(projectFeaturesSuccess(res.data));
  } catch (error) {
    dispatch(projectFeaturesFailure(error?.response?.data?.message));
    console.log(error);
  }
};
