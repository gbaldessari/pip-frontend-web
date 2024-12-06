export type ServiceResponse<T> = {
	success: boolean;
	data?: T;
	error?: string;
}

export type RegisterResponse = {
	message: string;
}

export type RegisterApoderadoPayload = {
	id: string;
	nombre: string;
	apellido: string;
}

export type AsistenciaPayload = {
	asignaturaId: string;
	alumnoId: string;
	fecha: string;
	asistencia: boolean;
}

export type AlumnoResponse = {
	id: string;
	nombre: string;
	apellido: string;
}



//------------------------------------------------------------------------//

export type RegisterApoderado = {
	id: string;
	nombre: string;
	apellido: string;
}

export type Alumno = {
	id: string;
	nombre: string;
	apellido: string;
	rut: string;
	fechaNacimiento: string;
	curso: string;
	apoderadoNombre: string;
	asistencia: AsistenciaPayload[];
	notas: Nota[];
}

export type Asistencia = {
	id: string;
	fecha: string;
	asistencia: boolean;
}

export type Nota = {
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
	id: string;
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

export type Curso = {
	id: string;
	nombre: string;
	asignaturaId: string;
	year: string;
	alumnos: Alumno[];
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

export type Profesor = {
	id: string;
	nombre: string;
	apellido: string;
	asignaturas: Asignatura[];
}

export type Asignatura = {
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

export type RegisterUser = {
	id: string;
	nombre: string;
	apellido: string;
	rol: string;
	uid: string;
}
