import axios from "axios";
import axiosInstance from "./AxiosInstance";
import { GetUserDataPayload, GetUserDataResponse, LoginPayload, LoginResponse, RecoverPasswordPayload, RecoverPasswordResponse, RegisterAlumno, RegisterApoderado, RegisterResponse, ServiceResponse, Student, Apoderados, UpdateAlumno, EliminarAlumno, RegisterAsignatura, Asignatura, Profesor, EliminarAsignatura } from "./services.types";



export const loginService = async (payload: LoginPayload): Promise<ServiceResponse<LoginResponse>> => {
  try {
    const response = await axiosInstance.post('ENDPOINT-LOGIN', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en loginService:', error);
    return { success: false, error: String(error) };
  }
};

export const registerApoderado = async (payload: RegisterApoderado): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axios.post('https://backend-integrador-32fz.onrender.com/apoderados/createApoderado', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en registerService:', error);
    return { success: false, error: String(error) };
  }
};

export const registerUser = async (payload: RegisterApoderado): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axios.post('https://backend-integrador-32fz.onrender.com/users/createUser', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en registerService:', error);
    return { success: false, error: String(error) };
  }
};

export const mostrarEstudiantes = async (): Promise<Student[]> => {
  try {
    const response = await axios.get(`https://backend-integrador-32fz.onrender.com/alumnos`); 
    return response.data; 
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    throw error; 
  }
};

export const mostrarApoderados = async (): Promise<Apoderados[]> => {
  try {
    const response = await axios.get(`https://backend-integrador-32fz.onrender.com/apoderados`); 
    return response.data; 
  } catch (error) {
    console.error("Error al obtener apoderados:", error);
    throw error; 
  }
};

export const mostrarCursos = async (): Promise<Student[]> => {
  try {
    const response = await axios.get(`https://backend-integrador-32fz.onrender.com/cursos`); 
    return response.data; 
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    throw error; 
  }
};

export const registerAlumno = async (payload: RegisterAlumno): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axios.post('https://backend-integrador-32fz.onrender.com/alumnos/createAlumno', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en registerService:', error);
    return { success: false, error: String(error) };
  }
};

export const updateAlumno = async (id: string, payload: UpdateAlumno): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axios.patch(`https://backend-integrador-32fz.onrender.com/alumnos/${id}`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en updateAlumno:', error);
    return { success: false, error: String(error) };
  }
};

export const eliminarAlumno = async (payload: EliminarAlumno): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axios.delete(`https://backend-integrador-32fz.onrender.com/alumnos/${payload.id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en eliminarAlumno:', error);
    return { success: false, error: String(error) };
  }
};


export const registerAsignatura = async (payload: RegisterAsignatura): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axios.post('https://backend-integrador-32fz.onrender.com/asignatura/createAsignatura', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en registerService:', error);
    return { success: false, error: String(error) };
  }
};

export const mostrarAsignatura = async (): Promise<Asignatura[]> => {
  try {
    const response = await axios.get(`https://backend-integrador-32fz.onrender.com/asignatura`); 
    return response.data; 
  } catch (error) {
    console.error("Error al obtener apoderados:", error);
    throw error; 
  }
};


export const eliminarAsignatura = async (payload: EliminarAsignatura): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axios.delete(`https://backend-integrador-32fz.onrender.com/asignatura/${payload.id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en eliminarAlumno:', error);
    return { success: false, error: String(error) };  const handleDeleteSubject = async (id: string) => {
    try {
      const response = await eliminarAsignatura(id);
      if (response.success) {
        setAsignaturas(asignaturas.filter(subject => subject.id !== id));
      } else {
        console.error("Error al eliminar asignatura:", response.error);
      }
    } catch (error) {
      console.error("Error al eliminar asignatura:", error);
    }
  };
  }
};

export const updateAsignatura = async (id: string, payload: UpdateAlumno): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axios.patch(`https://backend-integrador-32fz.onrender.com/asignatura/${id}`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en updateAlumno:', error);
    return { success: false, error: String(error) };
  }
};


export const mostrarProfesores = async (): Promise<Profesor[]> => {
  try {
    const response = await axios.get(`https://backend-integrador-32fz.onrender.com/profesores`); 
    return response.data; 
  } catch (error) {
    console.error("Error al obtener apoderados:", error);
    throw error; 
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
