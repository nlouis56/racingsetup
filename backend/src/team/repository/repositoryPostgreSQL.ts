import { AppDataSource } from "../../data-source";
import { Teams } from "../../entities/Teams";
import { Users } from "../../entities/Users";

export class TeamRepository {
    private repository = AppDataSource.getRepository(Teams);

    async createTeam(data: Partial<Teams>): Promise<Teams> {
        const team = this.repository.create(data);
        return this.repository.save(team);
    }

    async findTeamById(id: number): Promise<Teams | null> {
        return this.repository.findOne({ where: { id } });
    }

    async updateTeam(id: number, data: Partial<Teams>): Promise<Teams | null> {
        await this.repository.update(id, data);
        return this.findTeamById(id);
    }

    async deleteTeam(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async addMember(teamId: number, userId: number): Promise<Teams> {
        const team = await this.repository.findOne({ where: { id: teamId } });
        if (!team) throw new Error("Team not found");

        const members = team.members || [];
        if (members.includes(userId)) throw new Error("User already a member");

        team.members = [...members, userId];
        return this.repository.save(team);
    }

    async removeMember(teamId: number, userId: number): Promise<void> {
        const team = await this.repository.findOne({ where: { id: teamId } });
        if (!team) throw new Error("Team not found");

        team.members = team.members?.filter((member) => member !== userId) || [];
        await this.repository.save(team);
    }
}
