import { TeamRepository } from "../repository/repositoryPostgreSQL";
import { CreateTeamDTO, UpdateTeamDTO, AddMemberDTO } from "./domain";

export class TeamResolver {
    private teamRepository = new TeamRepository();

    async createTeam(ownerId: number, data: CreateTeamDTO) {
        return this.teamRepository.createTeam({ ...data, ownerId });
    }

    async updateTeam(id: number, data: UpdateTeamDTO) {
        return this.teamRepository.updateTeam(id, data);
    }

    async deleteTeam(id: number) {
        await this.teamRepository.deleteTeam(id);
    }

    async getTeamById(id: number) {
        return this.teamRepository.findTeamById(id);
    }

    async addMember(teamId: number, data: AddMemberDTO) {
        return this.teamRepository.addMember(teamId, data.userId);
    }

    async removeMember(teamId: number, userId: number) {
        await this.teamRepository.removeMember(teamId, userId);
    }
}
