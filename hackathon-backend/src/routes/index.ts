import { Router } from 'express';
import AvaliacaoRoutes   from "./AvaliacaoRoutes";
import AvaliadorRoutes   from "./AvaliadorRoutes";
import EquipesRoutes from "./EquipesRoutes";

const router = Router();

router.use('/avaliacoes', AvaliacaoRoutes);
router.use('/avaliadores', AvaliadorRoutes);
router.use('/equipes', EquipesRoutes);


export default router;
