import { Request, Response } from "express";
import EquipeService from "../services/equipesService";

class equipesController {
    async createEquipes(req: Request, res: Response): Promise<Response> {
        try {
          const equipes = await EquipeService.createEquipe(req.body);
          return res.status(201).json(equipes);
        } catch (error) {
          return res.status(500).json({ error: "Erro contate o Supervisor!" });
        }
    }

    async getAllEquipes(req: Request, res: Response): Promise<Response> {
        try {
          const equipes = await EquipeService.getAllEquipes();
          return res.status(200).json(equipes);
        } catch (error) {
          return res.status(500).json({ error: "Erro contate o Supervisor!" });
        }
    }

    async getEquipeById(req: Request, res: Response): Promise<Response> {
        try {
          const equipe = await EquipeService.getEquipeById(Number(req.params.id));
          return res.status(200).json(equipe);
        } catch (error) {
          return res.status(500).json({ error: "Erro contate o Supervisor!" });
        }
    }

    async updateEquipe(req: Request, res: Response): Promise<Response> {
        try {
          const equipe = await EquipeService.updateEquipe(Number(req.params.id), req.body);
          return res.status(200).json(equipe);
        } catch (error) {
          return res.status(500).json({ error: "Erro contate o Supervisor!" });
        }
    }

    async deleteEquipe(req: Request, res: Response): Promise<Response> {
        try {
          await EquipeService.deleteEquipe(Number(req.params.id));
          return res.status(200).json({ message: "Equipe deletada com sucesso!" });
        } catch (error) {
          return res.status(500).json({ error: "Erro contate o Supervisor!" });
        }
    }
}

export default new equipesController();


