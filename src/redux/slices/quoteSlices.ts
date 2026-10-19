import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProjectFeature, IQuote } from "@/types/quote";

interface QuoteState {
  projectFeature: IProjectFeature | null;
  quotes: IQuote[];
  isLoading: boolean;
  isLoadingQuote: boolean;
  error: string | null;
  errorQuote: string | null;
}

const initialState: QuoteState = {
  projectFeature: null,
  quotes: [],
  isLoading: false,
  isLoadingQuote: false,
  error: null,
  errorQuote: null,
};

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    projectFeaturesRequest: (state) => {
      state.projectFeature = null;
      state.isLoading = true;
      state.error = null;
    },
    projectFeaturesSuccess: (state, action: PayloadAction<IProjectFeature>) => {
      state.projectFeature = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    projectFeaturesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getQuotesRequest: (state) => {
      state.quotes = [];
      state.isLoadingQuote = true;
      state.errorQuote = null;
    },
    getQuotesSuccess: (state, action: PayloadAction<IQuote[]>) => {
      state.quotes = action.payload;
      state.isLoadingQuote = false;
      state.errorQuote = null;
    },
    getQuotesFailure: (state, action: PayloadAction<string>) => {
      state.isLoadingQuote = false;
      state.errorQuote = action.payload;
    },
  },
});

export const {
  projectFeaturesFailure,
  projectFeaturesRequest,
  projectFeaturesSuccess,
  getQuotesFailure,
  getQuotesRequest,
  getQuotesSuccess,
} = quoteSlice.actions;

export default quoteSlice.reducer;
