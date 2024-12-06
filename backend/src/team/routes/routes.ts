import express from "express";
import { authenticateToken } from "../../middleware/auth";
import { TeamResolver } from "../api/resolver";

const teamRouter = express.Router();
const resolver = new TeamResolver();

// POST /user/team
teamRouter.post("/team", authenticateToken, async (req, res) => {
    try {
        const ownerId = req.body.userId;
        const { name, description } = req.body;

        const team = await resolver.createTeam(ownerId, { name, description });
        res.status(201).json({
            teamId: team.id,
            name: team.name,
            description: team.description,
        });
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

// PUT /user/team/:id
teamRouter.put("/team/:id", authenticateToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, description } = req.body;

        const updatedTeam = await resolver.updateTeam(id, { name, description });
        if (!updatedTeam) {
            res.status(404).json({ message: "Team not found" });
            return;
        }

        res.json({
            teamId: updatedTeam.id,
            name: updatedTeam.name,
            description: updatedTeam.description,
        });
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

// DELETE /user/team/:id
teamRouter.delete("/team/:id", authenticateToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        await resolver.deleteTeam(id);
        res.json({ message: "Team deleted" });
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

// GET /user/team/:id
teamRouter.get("/team/:id", authenticateToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        const team = await resolver.getTeamById(id);
        if (!team) {
            res.status(404).json({ message: "Team not found" });
            return;
        }

        res.json({
            teamId: team.id,
            name: team.name,
            description: team.description,
        });
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

// POST /user/team/:id/members
teamRouter.post("/team/:id/members", authenticateToken, async (req, res) => {
    try {
        const teamId = parseInt(req.params.id, 10);
        const { userId } = req.body;

        const updatedTeam = await resolver.addMember(teamId, { userId });
        res.json({ teamId: updatedTeam.id, userId });
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

// DELETE /user/team/:id/members/:userId
teamRouter.delete("/team/:id/members/:userId", authenticateToken, async (req, res) => {
    try {
        const teamId = parseInt(req.params.id, 10);
        const userId = parseInt(req.params.userId, 10);

        await resolver.removeMember(teamId, userId);
        res.json({ message: "Member removed" });
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

export default teamRouter;
