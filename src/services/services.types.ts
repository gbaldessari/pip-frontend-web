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

export interface Student {
	id: string;
	nombre: string;
	apellido: string;
	rut: string;
	fechaNacimiento: string;
	curso: string;
	apoderadoNombre: string | null;
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

  }

  export type Apoderados = {
	nombre: string;
	apellido: string;
	id: string;
	estudiantes: Student[];
}