import { AppDataSource } from "../../data-source";
import { Vehicles } from "../../entities/Vehicles";

export class VehicleRepository {
    private vehicleRepository = AppDataSource.getRepository(Vehicles);

    async createVehicle(vehicleData: Partial<Vehicles>): Promise<Vehicles> {
        const vehicle = this.vehicleRepository.create(vehicleData);
        return this.vehicleRepository.save(vehicle);
    }

    async updateVehicle(vehicleId: number, vehicleData: Partial<Vehicles>): Promise<Vehicles> {
        await this.vehicleRepository.update(vehicleId, vehicleData);
        const updatedVehicle = await this.vehicleRepository.findOne({ where: { id: vehicleId } });
        if (!updatedVehicle) {
            throw new Error(`Vehicle with id ${vehicleId} not found`);
        }
        return updatedVehicle;
    }

    async deleteVehicle(vehicleId: number): Promise<void> {
        const result = await this.vehicleRepository.delete(vehicleId);
        if (result.affected === 0) {
            throw new Error(`Vehicle with id ${vehicleId} not found`);
        }
    }    

    async findVehicleById(vehicleId: number): Promise<Vehicles> {
        const vehicle = await this.vehicleRepository.findOne({ where: { id: vehicleId } });
        if (!vehicle) {
            throw new Error(`Vehicle with id ${vehicleId} not found`);
        }
        return vehicle;
    }
}
