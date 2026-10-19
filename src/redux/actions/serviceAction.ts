import { publicRequest } from "@/utils/makeRequest";
import { AppDispatch } from "../store";
import {
  getServiceFailure,
  getServiceRequest,
  getServicesFailure,
  getServicesRequest,
  getServicesSuccess,
  getServiceSuccess,
} from "../slices/serviceSlices";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const fetchServices = () => async (dispatch: AppDispatch) => {
  dispatch(getServicesRequest());
  try {
    const res = await publicRequest.get("/service");
    dispatch(getServicesSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(
      getServicesFailure(
        getErrorMessage(error?.response?.data?.message) ||
          "Failed to fetch services",
      ),
    );
  }
};

export const fetchService = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getServiceRequest());
  try {
    const res = await publicRequest.get(`/service/${id}`);
    dispatch(getServiceSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(
      getServiceFailure(
        getErrorMessage(error?.response?.data?.message) ||
          "Failed to fetch services",
      ),
    );
  }
};
