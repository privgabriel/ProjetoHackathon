import pool from "../database/dbConfig";

interface Avaliacao {
    id?: number;
    avaliador_id: number;
    equipe_id: number;
    notas: JSON;
}

class AvaliacaoModel {
    async createAvaliacoes(avaliacao: Avaliacao): Promise<Avaliacao> {
        const { avaliador_id, equipe_id, notas } = avaliacao;
        const { rows } = await pool.query(
            "INSERT INTO avaliacoes (avaliador_id, equipe_id, notas) VALUES ($1, $2, $3) RETURNING *",
            [avaliador_id, equipe_id, notas]
        );
        return rows[0];
    }

    async getAllAvaliacoesByUserId(user_id: number): Promise<Avaliacao[]> {
        const { rows } = await pool.query(
            "SELECT * FROM avaliacoes WHERE avaliador_id = $1",
            [user_id]
        );
        return rows;
    }

    async deleteAvaliacoes(id: number): Promise<void> {
        await pool.query("DELETE FROM avaliacoes WHERE id = $1", [id]);
    }
}

export { Avaliacao, AvaliacaoModel };