import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Users, Setups, SetupParameters } from "../../entities";

export class SetupRepository {
    private setupRepository: Repository<Setups>;
    private setupParametersRepository: Repository<SetupParameters>;

    constructor() {
        this.setupRepository = AppDataSource.getRepository(Setups);
        this.setupParametersRepository = AppDataSource.getRepository(SetupParameters);
    }

    async findAll(): Promise<Setups[]> {
        return await this.setupRepository.find();
    }

    async findById(id: number): Promise<Setups | null> {
        return await this.setupRepository.findOneBy({ id });
    }

    async save(setup: Setups): Promise<Setups> {
        return await this.setupRepository.save(setup);
    }

    async delete(setup: Setups): Promise<void> {
        await this.setupRepository.remove(setup);
    }

    async findParametersBySetupId(setupId: number): Promise<SetupParameters[]> {
        const id = setupId;
        return await this.setupParametersRepository.find({ where: { id } });
    }

    async saveParameter(parameter: SetupParameters): Promise<SetupParameters> {
        return await this.setupParametersRepository.save(parameter);
    }

    async deleteParameter(parameter: SetupParameters): Promise<void> {
        await this.setupParametersRepository.remove(parameter);
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
