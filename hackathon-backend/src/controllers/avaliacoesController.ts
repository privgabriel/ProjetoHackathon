import { Request, Response } from "express";
import AvaliacaoService from "../services/avaliacaoService";
import pool from "../database/dbConfig";

class avaliacoesController {
  async createAvaliacoes(req: Request, res: Response): Promise<Response> {
    try {
      const { avaliador_id, equipe_id, notas } = req.body;
      const checkResult = await pool.query(
          `SELECT CASE
                    WHEN COUNT(*) > 0 THEN 'true'
                    ELSE 'false'
                END AS ja_avaliou
                FROM avaliacoes
                WHERE avaliador_id = $1
                  AND equipe_id = $2;`,
          [avaliador_id, equipe_id]
      );

      if (checkResult.rows[0].ja_avaliou !== 'true') {
        const result = await pool.query(
            'INSERT INTO avaliacoes (avaliador_id, equipe_id, notas) VALUES ($1, $2, $3) RETURNING *',
            [avaliador_id, equipe_id, notas]
        );
        return res.status(201).json(result.rows[0]);
      } else {
        return res.status(400).json({ error: 'Um avaliador não pode registrar notas duas vezes para a mesma equipe' });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: "Erro contate o Supervisor!" });
      } else {
        return res.status(500).json({ error: "Erro desconhecido" });
      }
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

  async getAllAvaliacoes(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacoes = await AvaliacaoService.getAllAvaliacoes();
      return res.status(200).json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ error: "Erro contate o Supervisor!" });
    }
  }
}

export default new avaliacoesController();