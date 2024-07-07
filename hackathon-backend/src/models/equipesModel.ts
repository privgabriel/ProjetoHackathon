import pool from "../database/dbConfig";

interface Equipe {
    id?: number;
    nome: string;
    avaliador_id: number;
}

class EquipeModel {
    async createEquipe(equipe: Equipe, avaliador_id: number): Promise<Equipe> {
        const { nome } = equipe;
        const { rows } = await pool.query(
            "INSERT INTO equipes (nome, avaliador_id) VALUES ($1, $2) RETURNING *",
            [nome, avaliador_id]
        );
        return rows[0];
    }

    async getAllEquipes(): Promise<Equipe[]> {
        const { rows } = await pool.query("SELECT * FROM equipes");
        return rows;
    }

    async getEquipeById(id: number): Promise<Equipe> {
        const { rows } = await pool.query("SELECT * FROM equipes WHERE id = $1", [id]);
        return rows[0];
    }

    async updateEquipe(id: number, equipe: Equipe): Promise<Equipe> {
        const { nome } = equipe;
        const { rows } = await pool.query(
            "UPDATE equipes SET nome = $1 WHERE id = $2 RETURNING *",
            [nome, id]
        );
        return rows[0];
    }

    async deleteEquipe(id: number): Promise<void> {
        await pool.query("DELETE FROM equipes WHERE id = $1", [id]);
    }
}

export { Equipe, EquipeModel };