import { AppDataSource } from "../../data-source";
import { SavedVehicles } from "../../entities";
import { Vehicles } from "../../entities/Vehicles";

export class VehicleRepository {
    private vehicleRepository = AppDataSource.getRepository(Vehicles);
    private savedVehicleRepository = AppDataSource.getRepository(SavedVehicles);

    async createVehicle(vehicleData: Partial<Vehicles>, ownerId: number): Promise<SavedVehicles> {
        const getVehicle = await this.vehicleRepository.findOne({ where: { vehicleType: vehicleData.vehicleType, name: vehicleData.name } });
        let savedVehicle = null;
        if (getVehicle) {
            savedVehicle = this.savedVehicleRepository.create({ 
                name: getVehicle.name,
                description: getVehicle.description,
                vehicle: { id: getVehicle.id },
                owner: { id: ownerId }
            });
        } else {
            const vehicle = this.vehicleRepository.create(vehicleData);
            await this.vehicleRepository.save(vehicle);
            savedVehicle = this.savedVehicleRepository.create({ 
                name: vehicle.name,
                description: vehicle.description,
                vehicle: { id: vehicle.id },
                owner: { id: ownerId }
            });
        }
        return await this.savedVehicleRepository.save(savedVehicle);
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
        const result = await this.savedVehicleRepository.delete({ vehicle: { id: vehicleId } });
        if (result.affected === 0) {
            throw new Error(`Vehicle with id ${vehicleId} not found`);
        }
    }    

    async findVehicleById(vehicleId: number): Promise<SavedVehicles> {
        const vehicle = await this.savedVehicleRepository.findOne({ where: { vehicle: { id: vehicleId } }, relations: ['vehicle'] });
        if (!vehicle) {
            throw new Error(`Vehicle with id ${vehicleId} not found`);
        }
        return vehicle;
    }

    async findAllVehicles(id: number): Promise<SavedVehicles[]> {
        return this.savedVehicleRepository.find({ where: { owner: { id } } })
    }
}
