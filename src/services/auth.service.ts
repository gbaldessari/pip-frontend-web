import axiosInstance from "./AxiosInstance";
import { GetUserDataPayload, GetUserDataResponse, LoginPayload, LoginResponse, RecoverPasswordPayload, RecoverPasswordResponse, RegisterPayload, RegisterResponse, ServiceResponse } from "./services.types";

export const loginService = async (payload: LoginPayload): Promise<ServiceResponse<LoginResponse>> => {
  try {
    const response = await axiosInstance.post('ENDPOINT-LOGIN', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en loginService:', error);
    return { success: false, error: String(error) };
  }
};

export const registerService = async (payload: RegisterPayload): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.post('ENDPOINT-REGISTRO', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en registerService:', error);
    return { success: false, error: String(error) };
  }
};

export const recoverPasswordService = async (payload: RecoverPasswordPayload): Promise<ServiceResponse<RecoverPasswordResponse>> => {
  try {
    const response = await axiosInstance.post('ENDPOINT-RECUPERAR-CONTRASENA', payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getUserDataService = async (payload: GetUserDataPayload): Promise<ServiceResponse<GetUserDataResponse>> => {
  try {
    const response = await axiosInstance.get('ENDPOINT-OBTENER-DATOS-USUARIOS', {
      headers: { Authorization: `Bearer ${payload.token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};
