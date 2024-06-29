import { Request, Response } from "express";
import AvaliadorService from "../services/avaliadorService";

class avaliadorController {
    async createAvaliador(req: Request, res: Response): Promise<Response> {
        try {
          const avaliador = await AvaliadorService.createAvaliador(req.body);
          return res.status(201).json(avaliador);
        } catch (error) {
          return res.status(500).json({ error: "Erro contate o Supervisor!" });
        }
    }

    async getAllAvaliadores(req: Request, res: Response): Promise<Response> {
        try {
          const avaliadores = await AvaliadorService.getAllAvaliadores();
          return res.status(200).json(avaliadores);
        } catch (error) {
          return res.status(500).json({ error: "Erro contate o Supervisor!" });
        }
    }

    async getAvaliadorById(req: Request, res: Response): Promise<Response> {
        try {
          const avaliador = await AvaliadorService.getAvaliadorById(Number(req.params.id));
          return res.status(200).json(avaliador);
        } catch (error) {
          return res.status(500).json({ error: "Erro contate o Supervisor!" });
        }
    }

    async updateAvaliador(req: Request, res: Response): Promise<Response> {
        try {
          const avaliador = await AvaliadorService.updateAvaliador(Number(req.params.id), req.body);
          return res.status(200).json(avaliador);
        } catch (error) {
          return res.status(500).json({ error: "Erro contate o Supervisor!" });
        }
    }

    async deleteAvaliador(req: Request, res: Response): Promise<Response> {
        try {
          await AvaliadorService.deleteAvaliador(Number(req.params.id));
          return res.status(200).json({ message: "Avaliador deletado com sucesso!" });
        } catch (error) {
          return res.status(500).json({ error: "Erro contate o Supervisor!" });
        }
    }
}

export default new avaliadorController();