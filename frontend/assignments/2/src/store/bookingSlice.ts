import { createSlice } from "@reduxjs/toolkit";

interface Extra {
  Oven: boolean;
  Fridge: boolean;
  Windows: boolean;
}
interface Config {
  cleaningTypes: string[];
  frequencies: string[];
  extras: { name: string; price: number }[];
  timeSlots: string[];
}


interface BookingState {
  typeofCleaning: string;
  timeofCleaning: string;
  bedrooms: number;
  bathrooms: number;
  extra: Extra;

  date: string;
  time: string;
  hours: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
  termsAccepted: boolean;
  config: Config| null;
    loading: boolean;

}

const initialState: BookingState = {
  typeofCleaning: "",
  timeofCleaning: "",
  bedrooms: 1,
  bathrooms: 1,
  extra: { Oven: false, Fridge: false, Windows: false },

  date: "",
  time: "",
  hours: 1,

  fullName: "",
  email: "",
  phone: "",
  address: "",

  cardNumber: "",
  expiry: "",
  cvv: "",
  cardName: "",
  termsAccepted: false,
  config: null,
  loading: true,

};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setTypeofCleaning: (state, action) => {
      state.typeofCleaning = action.payload;
    },
    setTimeofCleaning: (state, action) => {
      state.timeofCleaning = action.payload;
    },
    setBedrooms: (state, action) => {
      state.bedrooms = action.payload;
    },
    setBathrooms: (state, action) => {
      state.bathrooms = action.payload;
    },

    toggleExtra: (state, action: { payload: "Oven" | "Fridge" | "Windows" }) => {
        const key = action.payload;
        state.extra[key] = !state.extra[key];
    },


    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setHours: (state, action) => {
      state.hours = action.payload;
    },

    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },

    setCardNumber: (state, action) => {
      state.cardNumber = action.payload;
    },
    setExpiry: (state, action) => {
      state.expiry = action.payload;
    },
    setCvv: (state, action) => {
      state.cvv = action.payload;
    },
    setCardName: (state, action) => {
      state.cardName = action.payload;
    },
    setTermsAccepted: (state, action) => {
        state.termsAccepted = action.payload;
    },
    setConfig: (state, action) => {
      state.config = action.payload;
      state.loading = false;
    },

  },
});

export const {
  setTypeofCleaning,
  setTimeofCleaning,
  setBedrooms,
  setBathrooms,
  toggleExtra,
  setDate,
  setTime,
  setHours,
  setFullName,
  setEmail,
  setPhone,
  setAddress,
  setCardNumber,
  setExpiry,
  setCvv,
  setCardName,
  setTermsAccepted,
  setConfig,
} = bookingSlice.actions;

export default bookingSlice.reducer;
