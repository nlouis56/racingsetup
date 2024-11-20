import { Setups } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { CreateSetupDTO } from "./domain";

export class SetupService {
    private setupRepository: Repository<Setups>;

    constructor() {
        this.setupRepository = AppDataSource.getRepository(Setups);
    }

    async findAll(): Promise<Setups[]> {
        return await this.setupRepository.find();
    }

    async findById(id: number): Promise<Setups | null> {
        return await this.setupRepository.findOneBy({ id });
    }

    async save(setup: CreateSetupDTO): Promise<Setups> {
        const newSetup = new Setups();
        newSetup.name = setup.name;
        newSetup.description = setup.description;
        newSetup.track = setup.track;
        newSetup.vehicle.id = setup.vehicleId;
        newSetup.user.id = setup.userId;
        return await this.setupRepository.save(newSetup);
    }

    async delete(setup: Setups): Promise<void> {
        await this.setupRepository.remove(setup);
    }

    async findSetupsByVehicleId(vehicleId: number): Promise<Setups[]> {
        return await this.setupRepository.find({ where: { vehicle: { id: vehicleId } } });
    }

    async findSetupsByUserId(userId: number): Promise<Setups[]> {
        return await this.setupRepository.find({ where: { user: { id: userId } } });
    }

    async findSetupsByUserIdAndVehicleId(userId: number, vehicleId: number): Promise<Setups[]> {
        return await this.setupRepository.find({ where: { user: { id: userId }, vehicle: { id: vehicleId } } });
    }
}
