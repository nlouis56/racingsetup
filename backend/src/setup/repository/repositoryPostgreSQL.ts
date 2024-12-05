import { AppDataSource } from '../../data-source';
import { SavedVehicles, SetupParameters, Users } from '../../entities';
import { SetupValues } from '../../entities/SetupValues';
import { Setups } from '../../entities/Setups';

export class SetupRepository {
    private repository = AppDataSource.getRepository(Setups);

    async createSetup(data: Partial<Setups>): Promise<Setups> {
        if (!data.vehicle || !data.user) {
            throw new Error('Vehicle and User must be provided');
        }

        const savedVehiclesRepository = AppDataSource.getRepository(SavedVehicles);

        // Vérifier si un `saved_vehicle` correspondant existe déjà
        let savedVehicle = await savedVehiclesRepository.findOne({
            where: {
                owner: { id: Number(data.user) },
                vehicle: { id: Number(data.vehicle) },
            },
        });

        // Si le `saved_vehicle` n'existe pas, créez-le
        if (!savedVehicle) {
            savedVehicle = savedVehiclesRepository.create({
                owner: { id: Number(data.user) }, // Association au User
                vehicle: { id: Number(data.vehicle) }, // Référence au véhicule
                name: data.name || 'Default Vehicle Name', // Nom par défaut ou fourni
                description: data.description || 'Default Description', // Description par défaut ou fournie
            });
            savedVehicle = await savedVehiclesRepository.save(savedVehicle);
        }

        // Créer le setup en utilisant le `saved_vehicle`
        const setup = this.repository.create({
            name: data.name,
            description: data.description,
            track: data.track,
            vehicle: savedVehicle,
        });

        return this.repository.save(setup);
    }

    async findSetupById(id: number): Promise<any> {
        const setup = await this.repository.findOne({ where: { id }, relations: ['vehicle'] });
        if (!setup) {
            throw new Error(`Setup with ID ${id} not found`);
        }
        const setupValues = await AppDataSource.getRepository(SetupValues).find({
            where: { setup: { id } },
            relations: ['parameter'],
        });
        return { ...setup, values: setupValues };
    }

    async updateSetup(id: number, data: Partial<Setups>): Promise<Setups> {
        const res = await this.repository.update(id, data);
        if (res.affected === 0) {
            throw new Error(`Setup with ID ${id} not found or no changes made`);
        }
        return this.findSetupById(id);
    }

    async deleteSetup(id: number): Promise<{ message: string }> {
        const setup = await this.repository.findOne({ where: { id } });
        if (!setup) {
            throw new Error(`Setup with ID ${id} not found`);
        }
        await this.repository.delete(id);
        return { message: `Setup with ID ${id} deleted successfully` };
    }
}


export class SetupValueRepository {
    private repository = AppDataSource.getRepository(SetupValues);

    async createSetupValue(data: Partial<SetupValues>): Promise<SetupValues> {
        // Vérifiez si le setup existe
        const setup = await AppDataSource.getRepository(Setups).findOne({
            where: { id: data.setup?.id },
        });
        if (!setup) {
            throw new Error(`Setup with ID ${data.setup?.id} not found`);
        }

        // Vérifiez si le paramètre existe
        let parameter = await AppDataSource.getRepository(SetupParameters).findOne({
            where: { id: data.parameter?.id },
        });
        if (!parameter) {
            // Créez automatiquement le paramètre
            parameter = AppDataSource.getRepository(SetupParameters).create({
                id: data.parameter?.id,
                name: `Parameter ${data.parameter?.id}`, // Nom par défaut
                description: `Automatically created parameter ${data.parameter?.id}`,
            });
            parameter = await AppDataSource.getRepository(SetupParameters).save(parameter);
        }

        // Créez et sauvegardez la valeur associée au setup
        const setupValue = this.repository.create({
            setup,
            parameter,
            value: data.value,
        });

        return this.repository.save(setupValue);
    }

    async updateSetupValue(id: number, value: Record<string, any>): Promise<SetupValues | null> {
        await this.repository.update(id, { value });
        return this.repository.findOne({ where: { id }, relations: ['setup', 'parameter'] });
    }

    async deleteSetupValue(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
