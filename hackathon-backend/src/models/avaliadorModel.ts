import pool from "../database/dbConfig";

interface Avaliador {
    id?: number;
    nome: string;
    login: string;
    senha: string;
}

class AvaliadorModel {
    async createAvaliador(avaliador: Avaliador): Promise<Avaliador> {
        const { nome, login, senha } = avaliador;

        const { rows } = await pool.query(
            "INSERT INTO avaliadores (nome, login, senha) VALUES ($1, $2, $3) RETURNING *",
            [nome, login, senha]
        );
        return rows[0];
    }

    async getAllAvaliadores(): Promise<Avaliador[]> {
        const { rows } = await pool.query("SELECT * FROM avaliadores");
        return rows;
    }

    async getAvaliadorById(id: number): Promise<Avaliador> {
        const { rows } = await pool.query("SELECT * FROM avaliadores WHERE id = $1", [id]);
        return rows[0];
    }

    async updateAvaliador(id: number, avaliador: Avaliador): Promise<Avaliador> {
        const { nome, login, senha } = avaliador;
        const { rows } = await pool.query(
            "UPDATE avaliadores SET nome = $1, login = $2, senha = $3 WHERE id = $4 RETURNING *",
            [nome, login, senha, id]
        );
        return rows[0];
    }

    async deleteAvaliador(id: number): Promise<void> {
        await pool.query("DELETE FROM avaliadores WHERE id = $1", [id]);
    }
}

export { Avaliador, AvaliadorModel };