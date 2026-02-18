interface RegistrationFormData {
    name: string;
    email: string;
    event: string;
    message?: string;
}
interface RegistrationStatusData{
    name: string;
    email: string;
    event: string;
    status: string;
}
interface RegistrationState {
    formData: RegistrationFormData;
    loading: boolean;
    error: string | null;
    success: boolean;
    registrationId: string | null;
    statusData: RegistrationStatusData | null;
}

 
export type { RegistrationFormData, RegistrationState, RegistrationStatusData };

