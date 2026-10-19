import { makeRequest } from "@/utils/makeRequest";
import { setCountries } from "../slices/countrySlices";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { AppDispatch } from "../store";

export const fetchCountries = () => async (dispatch: AppDispatch) => {
  try {
    const res = await makeRequest.get("/country");

    dispatch(setCountries(res.data));
  } catch (error) {
    console.log(error);
    getErrorMessage(error);
  }
};
