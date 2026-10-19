import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IService } from "@/types/service";

interface ServiceState {
  services: IService[];
  service: IService | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  service: null,
  isLoading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    getServicesRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getServicesSuccess: (state, action: PayloadAction<IService[]>) => {
      state.services = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getServicesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getServiceRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getServiceSuccess: (state, action: PayloadAction<IService>) => {
      state.service = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getServiceFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearServices: (state) => {
      state.services = [];
      state.service = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  getServicesFailure,
  getServicesRequest,
  getServicesSuccess,
  getServiceFailure,
  getServiceRequest,
  getServiceSuccess,
  clearServices,
} = serviceSlice.actions;

export default serviceSlice.reducer;
