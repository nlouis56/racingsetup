export interface CreateSetupDTO {
    vehicleId: number;
    name: string;
    description: string;
    track: string;
}

export interface UpdateSetupDTO {
    vehicleId?: number;
    name?: string;
    description?: string;
    track?: string;
}
