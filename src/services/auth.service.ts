import axiosInstance from "./AxiosInstance";
import { RegisterAlumno, RegisterApoderadoPayload, RegisterResponse, ServiceResponse, Apoderados, UpdateAlumno, EliminarAlumno, RegisterAsignatura, Asignatura, Profesor, EliminarAsignatura, Alumno, UpdateApoderado, EliminarApoderado, EliminarProfesor, RegisterProfesor, Curso, AsistenciaPayload, AlumnoResponse, NotaPayload, Foro, ForoPayload, ComentarioPayload, NotaResponse, AsistenciaResponse } from "./services.types";


export const registerApoderado = async (payload: RegisterApoderadoPayload): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.post('/apoderados/createApoderado', payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const registerUser = async (payload: RegisterApoderadoPayload): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.post('/users/createUser', payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const mostrarEstudiantes = async (): Promise<ServiceResponse<Alumno[]>> => {
  try {
    const response = await axiosInstance.get('/alumnos');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const mostrarApoderados = async (): Promise<ServiceResponse<Apoderados[]>> => {
  try {
    const response = await axiosInstance.get('/apoderados');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const mostrarCursos = async (): Promise<ServiceResponse<Curso[]>> => {
  try {
    const response = await axiosInstance.get('/cursos');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const registerAlumno = async (payload: RegisterAlumno): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.post('/alumnos/createAlumno', payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en registerService:', error);
    return { success: false, error: String(error) };
  }
};

export const updateAlumno = async (id: string, payload: UpdateAlumno): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.patch(`/alumnos/${id}`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const eliminarAlumno = async (payload: EliminarAlumno): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.delete(`/alumnos/${payload.id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const registerAsignatura = async (payload: RegisterAsignatura): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.post('/asignatura/createAsignatura', payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const mostrarAsignatura = async (): Promise<ServiceResponse<Asignatura[]>> => {
  try {
    const response = await axiosInstance.get('/asignatura');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const eliminarAsignatura = async (payload: EliminarAsignatura): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.delete(`/asignatura/${payload.id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const updateAsignatura = async (id: string, payload: Asignatura): Promise<ServiceResponse<string>> => {
  try {
    const response = await axiosInstance.patch(`/asignatura/${id}`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en updateAlumno:', error);
    return { success: false, error: String(error) };
  }
};

export const mostrarProfesores = async (): Promise<ServiceResponse<Profesor[]>> => {
  try {
    const response = await axiosInstance.get('/profesores');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const eliminarApoderado = async (payload: EliminarApoderado): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.delete(`/apoderados/${payload.id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const updateApoderado = async (payload: UpdateApoderado): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.patch(`/apoderados/update`, payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const registerProfesores = async (payload: RegisterProfesor): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.post('/profesores/createProfesor', payload);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const eliminarProfesor = async (payload: EliminarProfesor): Promise<ServiceResponse<RegisterResponse>> => {
  try {
    const response = await axiosInstance.delete(`/profesores/${payload.id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const mostrarAdmins = async (): Promise<ServiceResponse<any>> => {
  try {
    const response = await axiosInstance.get('/admins');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getAsignaturasdeUnProfesor = async (id: string): Promise<ServiceResponse<Asignatura[]>> => {
  try {
    const response = await axiosInstance.get(`/profesores/${id}/asignaturas`);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export const getAlumnosCurso = async (id: string): Promise<ServiceResponse<AlumnoResponse[]>> => {
  try {
    const response = await axiosInstance.get(`/asignatura/${id}/alumnos`);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export const enviarAsistencia = async (payload: AsistenciaPayload[]): Promise<ServiceResponse<String>> => {
  try {
    await axiosInstance.post('/asistencia/bulk', payload);
    return { success: true, data: "Asistencia enviada" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const enviarNotas = async (payload: NotaPayload[]): Promise<ServiceResponse<String>> => {
  try {
    await axiosInstance.post('/notas/bulk', payload);
    return { success: true, data: "Notas enviadas" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getForosdeUnProfesor = async (id: string): Promise<ServiceResponse<Foro[]>> => {
  try {
    const response = await axiosInstance.get(`/foro/${id}/forosProfesor`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export const createForo = async (payload: ForoPayload): Promise<ServiceResponse<String>> => {
  try {
    await axiosInstance.post('/foro/createForo', payload);
    return { success: true, data: "Foro creado" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export const comentarForo = async (payload: ComentarioPayload): Promise<ServiceResponse<String>> => {
  try {
    await axiosInstance.post(`foro-comentario`, payload);
    return { success: true, data: "Comentario creado" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export const eliminarForo = async (idForo:string): Promise<ServiceResponse<String>> => {
  try {
    await axiosInstance.delete(`foro/${idForo}`);
    return { success: true, data: "Comentario creado" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export const obtenerNotas = async (idAlumno:string): Promise<ServiceResponse<NotaResponse[]>> => {
  try {
    const response = await axiosInstance.get(`notas/${idAlumno}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export const getAlumnosdeUnApoderado = async (idApoderado:string): Promise<ServiceResponse<AlumnoResponse[]>> => {
  try {
    const response = await axiosInstance.get(`apoderados/alumnos/${idApoderado}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export const obtenerAsistencia = async (idAlumno:string): Promise<ServiceResponse<AsistenciaResponse[]>> => {
  try {
    const response = await axiosInstance.get(`alumnos/asistencia/${idAlumno}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}