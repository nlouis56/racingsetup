export interface RegisterUserDTO {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    racingNumber: number;
}

export interface LoginUserDTO {
    username: string;
    password: string;
}

export interface UpdateUserDTO {
    username?: string;
    passwordHash?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    racingNumber?: number;
}

export interface UserResponse {
    id: number;
    username: string;
    racingNumber: number;
}
