import { Router } from "express";
import { VehicleResolver } from "../api/resolver";
import { authenticateToken } from "../../middleware/auth";

const router = Router();
const vehicleResolver = new VehicleResolver();

router.post("/", authenticateToken, (req, res) => vehicleResolver.createVehicle(req, res));
router.get("/list", authenticateToken, (req, res) => vehicleResolver.getAllVehiclesByUser(req, res));
router.put("/:id", authenticateToken, (req, res) => vehicleResolver.updateVehicle(req, res));
router.delete("/:id", authenticateToken, (req, res) => vehicleResolver.deleteVehicle(req, res));
router.get("/:id", authenticateToken, (req, res) => vehicleResolver.getVehicle(req, res));

export default router;
