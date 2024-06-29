import pool from '../database/dbConfig';

class EquipeService {
    async createEquipe(data: any) {
        const { nome } = data;
        const checkResult = await pool.query('SELECT * FROM equipes WHERE nome = $1', [nome]);
        if (checkResult.rows.length > 0) {
            throw new Error('Nome da equipe já existe');
        }

        const result = await pool.query('INSERT INTO equipes (nome) VALUES ($1) RETURNING *', [nome]);
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
