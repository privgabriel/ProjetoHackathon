import pool from '../database/dbConfig';

class AvaliadorService {
    async createAvaliador(data: any) {
        const { nome, login, senha } = data;
        const checkResult = await pool.query('SELECT * FROM avaliadores WHERE nome = $1', [nome]);
        if (checkResult.rows.length > 0) {
            throw new Error('Nome do avaliador já existe');
        }

        const checkResult2 = await pool.query('SELECT * FROM avaliadores WHERE login = $1', [login]);
        if (checkResult2.rows.length > 0) {
            throw new Error('Login do avaliador já existe');
        }

        const result = await pool.query(
            'INSERT INTO avaliadores (nome, login, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, login, senha]
        );
        return result.rows[0];
    }

    async getAllAvaliadores() {
        const result = await pool.query('SELECT * FROM avaliadores');
        return result.rows;
    }

    async getAvaliadorById(id: number) {
        const result = await pool.query('SELECT * FROM avaliadores WHERE id = $1', [id]);
        return result.rows[0];
    }

    async updateAvaliador(id: number, data: any) {
        const { nome, login, senha } = data;
        const result = await pool.query(
            'UPDATE avaliadores SET nome = $1, login = $2, senha = $3 WHERE id = $4 RETURNING *',
            [nome, login, senha, id]
        );
        return result.rows[0];
    }

    async deleteAvaliador(id: number) {
        const result = await pool.query('DELETE FROM avaliadores WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount !== null && result.rowCount > 0) {
            return true;
        }
        return false;
    }
}

export default new AvaliadorService();
