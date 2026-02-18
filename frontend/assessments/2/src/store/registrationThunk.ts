import { createAsyncThunk } from "@reduxjs/toolkit";
import type  { RegistrationFormData } from "../types/registration";

const API = "https://iemghcko31.execute-api.ap-south-1.amazonaws.com/register"
export const submitRegistration = createAsyncThunk(
    "registration/submit",
    async (formData: RegistrationFormData, thunkAPI) => {
        try{
            const response=await fetch(API,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
            },
             body: JSON.stringify(formData),
        })
        if(!response.ok){
            throw new Error("Failed to submit registration");
        }
        const data=await response.json();
        return data.registrationId as string;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error: any ){
            return thunkAPI.rejectWithValue(error.message);
    }
}
);


    