import type { RegistrationState } from "../types/registration";
import { createSlice  } from "@reduxjs/toolkit";
import { submitRegistration } from "./registrationThunk";
import { fetchRegistrationStatus } from "./registrationStatusThunk";
const initialState: RegistrationState = {
    formData: {
        name: "",
        email: "",
        event: "",
        message: "",
    },
    loading: false,
    error: null,
    success: false,
    registrationId: null,
    statusData: null,
}
const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.formData.name = action.payload;
        },
        setEmail: (state, action) => {
            state.formData.email = action.payload;
        },
        setEvent: (state, action) => {
            state.formData.event = action.payload;
        },
        setMessage: (state, action) => {
            state.formData.message = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(submitRegistration.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(submitRegistration.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.registrationId = action.payload;
        })
        .addCase(submitRegistration.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.success = false;
        })
        .addCase(fetchRegistrationStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        }
    )
        .addCase(fetchRegistrationStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.statusData = action.payload;
        }
        )
        .addCase(fetchRegistrationStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        }
    )
    }
   
})
export const { setName, setEmail, setEvent, setMessage } = registrationSlice.actions;
export default registrationSlice.reducer;
