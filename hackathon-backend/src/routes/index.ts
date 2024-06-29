import { Router } from 'express';
import AvaliacaoRoutes   from "./AvaliacaoRoutes";
import AvaliadorRoutes   from "./AvaliadorRoutes";

const router = Router();

router.use('/avaliacoes', AvaliacaoRoutes);
router.use('/avaliadores', AvaliadorRoutes);

export default router;
