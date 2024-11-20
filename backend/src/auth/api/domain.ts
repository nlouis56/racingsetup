export interface RegisterDTO {
    email: string;
    password: string;
    displayName: string;
    firstName: string;
    lastName: string;
    racingNumber: number;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}
