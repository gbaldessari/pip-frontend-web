import axiosInstance from "./AxiosInstance";

export const loginService = async (payload: { Username: string; Password: string }) => {
  try {
    const response = await axiosInstance.post('/auth/login', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en loginService:', error);
    return { success: false, error: String(error) };
  }
};