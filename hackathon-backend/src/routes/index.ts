import { Router } from 'express';
import AvaliacaoRoutes   from "./AvaliacaoRoutes";

const router = Router();

router.use('/avaliacoes', AvaliacaoRoutes);

export default router;
