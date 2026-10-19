import { Currency } from "@/types/currency";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CurrencyState {
  currencies: Currency[];
  loading: boolean;
}

const initialState: CurrencyState = {
  currencies: [],
  loading: false,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setcurrencies: (state, action: PayloadAction<Currency[]>) => {
      state.currencies = action.payload;
    },

    addCurrency: (state, action: PayloadAction<Currency>) => {
      state.currencies.push(action.payload);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    clearCurrencies: (state) => {
      state.currencies = [];
    },
  },
});

export const { setcurrencies, addCurrency, setLoading, clearCurrencies } =
  currencySlice.actions;

export default currencySlice.reducer;
