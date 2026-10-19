import { makeRequest } from "@/utils/makeRequest";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { AppDispatch } from "../store";
import { setcurrencies } from "../slices/currencySlices";

export const fetchCurrencies = () => async (dispatch: AppDispatch) => {
  try {
    const res = await makeRequest.get("/currency");

    dispatch(setcurrencies(res.data));
  } catch (error) {
    console.log(error);
    getErrorMessage(error);
  }
};
