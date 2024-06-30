import { Router } from "express";
import avaliacoesController from "../controllers/avaliacoesController";

const router = Router();

router.post("/", avaliacoesController.createAvaliacoes);
router.get("/:avaliador_id", avaliacoesController.getAllAvaliacoesByUserId);
router.delete("/:avaliador_id", avaliacoesController.deleteAvaliacoes);
router.get("/", avaliacoesController.getAllAvaliacoes);

export default router;