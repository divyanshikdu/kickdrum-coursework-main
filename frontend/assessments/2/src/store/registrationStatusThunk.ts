import { createAsyncThunk } from "@reduxjs/toolkit";
import type  { RegistrationStatusData } from "../types/registration";

export const fetchRegistrationStatus = createAsyncThunk(
    "registration/status",
    async (id: string, thunkAPI) => {
        try{
            const response= await fetch(`https://iemghcko31.execute-api.ap-south-1.amazonaws.com/registration-status/${id}`);
        if(!response.ok){
            throw new Error("Failed to fetch status");
        }
        const data=await response.json();
        return data as RegistrationStatusData;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error: any ){
            return thunkAPI.rejectWithValue(error.message);
    }
}
);


    