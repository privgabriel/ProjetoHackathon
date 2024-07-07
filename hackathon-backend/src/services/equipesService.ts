import pool from '../database/dbConfig';
import {QueryResult} from "pg";
import {Equipe} from "../models/equipesModel";

class EquipeService {
    async createEquipe(data: any): Promise<Equipe> {
        const { nome, avaliador_id } = data;

        // Verifica se o nome da equipe já existe
        const checkResult = await pool.query('SELECT * FROM equipes WHERE nome = $1', [nome]);
        if (checkResult.rows.length > 0) {
            throw new Error('Nome da equipe já existe');
        }

        // Insere a nova equipe com o avaliador atribuído
        const result = await pool.query(
            'INSERT INTO equipes (nome, avaliador_id) VALUES ($1, $2) RETURNING *',
            [nome, avaliador_id]
        );
        return result.rows[0];
    }

    async getAllEquipes() {
        const result = await pool.query('SELECT * FROM equipes');
        return result.rows;
    }

    async getEquipeById(id: number) {
        const result = await pool.query('SELECT * FROM equipes WHERE id = $1', [id]);
        return result.rows[0];
    }

    async updateEquipe(id: number, data: any) {
        const { nome } = data;
        const result = await pool.query('UPDATE equipes SET nome = $1 WHERE id = $2 RETURNING *', [nome, id]);
        return result.rows[0];
    }

    async deleteEquipe(id: number) {
        const result = await pool.query('DELETE FROM equipes WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount !== null && result.rowCount > 0) {
            return true;
        }
        return false;
    }
}

export default new EquipeService();
