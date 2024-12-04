import { VehicleEnumType } from "../../entities";

export interface CreateVehicleDTO {
    vehicleType: VehicleEnumType;
    name: string;
    description: string;
}

export interface UpdateVehicleDTO {
    vehicleType?: VehicleEnumType;
    name?: string;
    description?: string;
}

export interface VehicleResponse {
    vehicleId: number;
    vehicleType: string;
    name: string;
    description: string;
}
