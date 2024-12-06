import { Request, Response } from "express";
import { VehicleRepository } from "../repository/repositoryPostgreSQL";
import { CreateVehicleDTO, UpdateVehicleDTO, VehicleResponse } from "./domain";
import { VehicleEnumType } from "../../entities";

const vehicleRepository = new VehicleRepository();

export class VehicleResolver {
    /**
     * POST /user/vehicle
     */
    async createVehicle(req: Request, res: Response): Promise<void> {
        try {
            const vehicleData: CreateVehicleDTO = req.body;
    
            if (!Object.values(VehicleEnumType).includes(vehicleData.vehicleType)) {
                throw new Error(`Invalid vehicle type: ${vehicleData.vehicleType}`);
            }
            const data = {
                vehicleType: vehicleData.vehicleType as VehicleEnumType,
                name: vehicleData.name,
                description: vehicleData.description,
            }
            const vehicle = await vehicleRepository.createVehicle(data);
    
            const response: VehicleResponse = {
                vehicleId: vehicle.id,
                vehicleType: vehicle.vehicleType,
                name: vehicle.name,
                description: vehicle.description,
            };
    
            res.status(201).json(response);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    /**
     * PUT /user/vehicle/:id
     */
    async updateVehicle(req: Request, res: Response): Promise<void> {
        try {
            const vehicleId = Number(req.params.id);
            const updateData: Partial<UpdateVehicleDTO> = req.body;
    
            if (updateData.vehicleType && !Object.values(VehicleEnumType).includes(updateData.vehicleType)) {
                throw new Error(`Invalid vehicle type: ${updateData.vehicleType}`);
            }

            const data = {
                vehicleType: updateData.vehicleType as VehicleEnumType,
                name: updateData.name,
                description: updateData.description,
            }
    
            const updatedVehicle = await vehicleRepository.updateVehicle(vehicleId, data);
    
            const response: VehicleResponse = {
                vehicleId: updatedVehicle.id,
                vehicleType: updatedVehicle.vehicleType,
                name: updatedVehicle.name,
                description: updatedVehicle.description,
            };
    
            res.status(200).json(response);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    

    /**
     * DELETE /user/vehicle/:id
     */
    async deleteVehicle(req: Request, res: Response): Promise<void> {
        try {
            const vehicleId = Number(req.params.id);
            await vehicleRepository.deleteVehicle(vehicleId);
    
            res.status(200).json({ message: "Vehicle deleted" });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }    

    /**
     * GET /user/vehicle/:id
     */
    async getVehicle(req: Request, res: Response): Promise<void> {
        try {
            const vehicleId = Number(req.params.id);
            const vehicle = await vehicleRepository.findVehicleById(vehicleId);
    
            const response: VehicleResponse = {
                vehicleId: vehicle.id,
                vehicleType: vehicle.vehicleType,
                name: vehicle.name,
                description: vehicle.description,
            };
    
            res.status(200).json(response);
        } catch (err: any) {
            res.status(404).json({ message: err.message });
        }
    }

    /**
     * GET /user/vehicles
     */

    async getAllVehiclesByUser(req: Request, res: Response): Promise<void> {
        try {
            const vehicles = await vehicleRepository.findAllVehicles(req.body.user.userId);
            const response = vehicles.map(vehicle => ({
                vehicleId: vehicle.id,
                vehicleType: vehicle.vehicleType,
                name: vehicle.name,
                description: vehicle.description,
            }));
    
            res.status(200).json(response);
        } catch (err: any) {
            res.status(404).json({ message: err.message });
        }
    }
}
