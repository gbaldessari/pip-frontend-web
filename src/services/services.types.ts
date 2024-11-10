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
