import { Router } from "express";
import AvaliadoresController from "../controllers/avaliadoresController";

const router = Router();

router.post("/", AvaliadoresController.createAvaliador);
router.get("/", AvaliadoresController.getAllAvaliadores);
router.get("/:id", AvaliadoresController.getAvaliadorById);
router.put("/:id", AvaliadoresController.updateAvaliador);
router.delete("/:id", AvaliadoresController.deleteAvaliador);

export default router;