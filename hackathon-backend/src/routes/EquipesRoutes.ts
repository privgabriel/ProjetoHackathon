import { Router } from "express";
import EquipesController from "../controllers/equipesController";

const router = Router();

router.post("/", EquipesController.createEquipes);
router.get("/", EquipesController.getAllEquipes);
router.get("/:id", EquipesController.getEquipeById);
router.put("/:id", EquipesController.updateEquipe);
router.delete("/:id", EquipesController.deleteEquipe);

export default router;