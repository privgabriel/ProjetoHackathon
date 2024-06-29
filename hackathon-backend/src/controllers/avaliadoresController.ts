import { Request, Response } from 'express';
import AvaliadorService from '../services/avaliadorService';

class AvaliadoresController {
    async createAvaliador(req: Request, res: Response): Promise<Response> {
        const { nome, login, senha } = req.body;

        // Verificação de campos obrigatórios
        if (!nome || !login || !senha) {
            return res.status(400).json({ error: 'Nome, login e senha são obrigatórios' });
        }

        try {
            const avaliador = await AvaliadorService.createAvaliador({ nome, login, senha });
            return res.status(201).json(avaliador);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro contate o Supervisor!' });
        }
    }

    async getAllAvaliadores(req: Request, res: Response): Promise<Response> {
        try {
            const avaliadores = await AvaliadorService.getAllAvaliadores();
            return res.status(200).json(avaliadores);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro contate o Supervisor!' });
        }
    }

    async getAvaliadorById(req: Request, res: Response): Promise<Response> {
        try {
            const avaliador = await AvaliadorService.getAvaliadorById(Number(req.params.id));
            if (!avaliador) {
                return res.status(404).json({ error: 'Avaliador não encontrado' });
            }
            return res.status(200).json(avaliador);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro contate o Supervisor!' });
        }
    }

    async updateAvaliador(req: Request, res: Response): Promise<Response> {
        const { nome, login, senha } = req.body;

        // Verificação de campos obrigatórios
        if (!nome || !login || !senha) {
            return res.status(400).json({ error: 'Nome, login e senha são obrigatórios' });
        }

        try {
            const avaliador = await AvaliadorService.updateAvaliador(Number(req.params.id), { nome, login, senha });
            if (!avaliador) {
                return res.status(404).json({ error: 'Avaliador não encontrado' });
            }
            return res.status(200).json(avaliador);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro contate o Supervisor!' });
        }
    }

    async deleteAvaliador(req: Request, res: Response): Promise<Response> {
        try {
            const result = await AvaliadorService.deleteAvaliador(Number(req.params.id));
            if (!result) {
                return res.status(404).json({ error: 'Avaliador não encontrado' });
            }
            return res.status(200).json({ message: 'Avaliador deletado com sucesso!' });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro contate o Supervisor!' });
        }
    }
}

export default new AvaliadoresController();
