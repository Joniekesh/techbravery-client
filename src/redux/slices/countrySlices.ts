import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Currency {
  id: string;
  iso: string;
  name: string;
  symbol: string;
}

export interface Country {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  dialCode?: string;
  flag: string;
  currencyId?: string;
  currency?: Currency;
  isSupported: boolean;
  isActive: boolean;
}

export interface CountryState {
  countries: Country[];
  loading: boolean;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
    },

    addCountry: (state, action: PayloadAction<Country>) => {
      state.countries.push(action.payload);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    clearCountries: (state) => {
      state.countries = [];
    },
  },
});

export const { setCountries, addCountry, setLoading, clearCountries } =
  countrySlice.actions;

export default countrySlice.reducer;
