import axiosInstance from "./AxiosInstance";

export const loginService = async (payload: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/auth/login', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en loginService:', error);
    return { success: false, error: String(error) };
  }
};

export const registerService = async (payload: { nombre: string; apellido: string; email: string; rol: string; }) => {
  try {
    const response = await axiosInstance.post('/auth/register', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en registerService:', error);
    return { success: false, error: String(error) };
  }
};
