import { SetupRepository } from '../repository/repositoryPostgreSQL';
import { SetupValueRepository } from '../repository/repositoryPostgreSQL';
import { SetupValues } from '../../entities/SetupValues';
import { Setups } from '../../entities/Setups';

export class SetupResolver {
    private repository = new SetupRepository();

    async createSetup(data: Partial<Setups>): Promise<Setups> {
        return this.repository.createSetup(data);
    }

    async updateSetup(id: number, data: Partial<Setups>): Promise<Setups | null> {
        return this.repository.updateSetup(id, data);
    }

    async deleteSetup(id: number): Promise<void> {
        this.repository.deleteSetup(id);
    }

    async getSetupById(id: number): Promise<Setups | null> {
        return this.repository.findSetupById(id);
    }
}

export class SetupValueResolver {
    private repository = new SetupValueRepository();

    public async createSetupValue(data: Partial<SetupValues>): Promise<SetupValues> {
        return this.repository.createSetupValue(data);
    }

    async updateSetupValue(id: number, value: Record<string, any>): Promise<SetupValues | null> {
        return this.repository.updateSetupValue(id, value);
    }

    async deleteSetupValue(id: number): Promise<void> {
        return this.repository.deleteSetupValue(id);
    }
}
