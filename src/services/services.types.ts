export type ServiceResponse<T> = {
	success: boolean;
	data?: T;
	error?: string;
}

export type LoginResponse = {
	token: string;
	refreshtoken: string;
}

export type RegisterResponse = {
	message: string;
}

export type RecoverPasswordResponse = {
	message: string;
}

export type GetUserDataResponse = {
	nombre: string;
	apellido: string;
	email: string;
	rol: string;
}

export type LoginPayload = {
	email: string;
	password: string;
}

export type RegisterApoderado = {
	id: string;
	nombre: string;
	apellido: string;
}

export type RegisterUser = {
	id: string;
	nombre: string;
	apellido: string;
	rol: string;
	uid: string;

}

export type RecoverPasswordPayload = {
	email: string;
}

export type GetUserDataPayload = {
	token: string;
}

//------------------------------------------------------------------------//

export interface Alumno {
	id: string;
	nombre: string;
	apellido: string;
	rut: string;
	fechaNacimiento: string;
	curso: string;
	apoderadoNombre: string ;
	asistencia: Asistencia[];
    notas : Nota[];
  }

export interface Asistencia {
	id: string;
	fecha: string;
	asistencia: boolean;
}

export interface Nota {
	id: string;
	calificacion: number;
	alumnoId: string;
	asignaturaId: string;
	fecha: string;
}



export type RegisterAlumno = {
	nombre: string;
	apellido: string;
	rut: string;
	fechaNacimiento: string;
	apoderadoId: string;
	curso: string;

}

export type UpdateAlumno = {
	nombre?: string;
	apellido?: string;
	curso?: string;
}

export type UpdateApoderado = {
	nombre?: string;
	apellido?: string;
}


export type RegisterEstudiante = {
	nombre: string;
	apellido: string;
	rut: string;
	fechaNacimiento: string;
	apoderadoId: string;
	curso: string;

}

export interface Curso {
	id: string;
	nombre: string;
	asignaturaId: string;
	year: string;
	alumnos:  Alumno[];
  }

export type Apoderados = {
	nombre: string;
	apellido: string;
	id: string;
	alumnos: Alumno[];
}

export type EliminarAlumno = {
	id: string;
}

export type EliminarAsignatura = {
	id: string;
}

export interface Profesor {
	id: string;
	nombre: string;
	apellido: string;
	asignaturas: Asignatura[];
  }

export interface Asignatura{
	id: string;
	nombre: string;
	profesor: Profesor;
	curso: Curso;
}

export type RegisterAsignatura = {
	nombre: string;
	profesorId: string;
	cursoId: string;
}

export type EliminarApoderado = {
	id: string;
}

export type RegisterProfesor = {
	id: string;
	nombre: string;
	apellido: string;
}

export type EliminarProfesor = {
	id: string;
}