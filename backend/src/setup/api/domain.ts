export interface CreateSetupDTO {
    vehicleId: number;
    userId: number;
    name: string;
    description: string;
    track: string;
}

export interface CreateSetupParameterDTO {
    name: string;
    description: string;
    applicableTo: string[];
}

export interface AddSetupValueDTO {
    setupId: number;
    parameterId: number;
    value: JSON;
}

export interface SetupDTO {
    id: number;
    vehicleId: number;
    userId: number;
    name: string;
    description: string;
    track: string;
    createdAt: Date;
}

export interface SetupParameterDTO {
    id: number;
    name: string;
    description: string;
    applicableTo: string[];
    createdAt: Date;
}

export interface SetupValueDTO {
    id: number;
    setupId: number;
    parameterId: number;
    value: JSON;
    createdAt: Date;
}

