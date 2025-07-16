export type ServerResponse<T> = {
    data?: T;
    message: string;
}

export type LoginResponse = {
    id: string;
    email: string;
    firstName: string;
}

export type RegisterResponse = {
    id: string;
}