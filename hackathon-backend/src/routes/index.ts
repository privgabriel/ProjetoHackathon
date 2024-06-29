import { Router } from 'express';
import AvaliacaoRoutes   from "./AvaliacaoRoutes";
import AvaliadorRoutes   from "./AvaliadorRoutes";
import EquipesRoutes from "./EquipesRoutes";
import LoginRoutes from "./LoginRoutes";

const router = Router();

router.use('/avaliacoes', AvaliacaoRoutes);
router.use('/avaliadores', AvaliadorRoutes);
router.use('/equipes', EquipesRoutes);
router.use('/login', LoginRoutes);



export default router;
