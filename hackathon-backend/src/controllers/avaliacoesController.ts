import { Request, Response } from "express";
import AvaliacaoService from "../services/avaliacaoService";

class avaliacoesController {
    async createAvaliacoes(req: Request, res: Response): Promise<Response> {
        try {
          const avaliacoes = await AvaliacaoService.createAvaliacao(req.body);
          return res.status(201).json(avaliacoes);
        } catch (error) {
          return res.status(500).json({ error: "Erro contate o Supervisor!" });
        }
}

async getAllAvaliacoesByUserId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const avaliacoes = await AvaliacaoService.getAllAvaliacoesByUserId(
        Number(req.params.avaliador_id)
      );
      return res.status(200).json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ error: "Erro contate o Supervisor!" });
    }
  }


  async deleteAvaliacoes(req: Request, res: Response): Promise<Response> {
    try {
      await AvaliacaoService.deleteAvaliacoes(Number(req.params.avaliador_id));
      return res.status(200).json({ message: "Avaliação deletada com sucesso!" });
    } catch (error) {
      return res.status(500).json({ error: "Erro contate o Supervisor!" });
    }
  }
}

export default new avaliacoesController();