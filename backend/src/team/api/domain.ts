export interface CreateTeamDTO {
    name: string;
    description: string;
}

export interface UpdateTeamDTO {
    name?: string;
    description?: string;
}

export interface AddMemberDTO {
    userId: number;
}

export interface TeamResponseDTO {
    teamId: number;
    name: string;
    description: string;
}
