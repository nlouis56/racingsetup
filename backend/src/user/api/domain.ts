export interface CreateUserDTO {
    email: string;
    firstName: string;
    lastName: string;
    racingNumber: number;
    isAdmin: boolean;
}

export interface UpdateUserDTO {
    email?: string;
    firstName?: string;
    lastName?: string;
    racingNumber?: number;
}
