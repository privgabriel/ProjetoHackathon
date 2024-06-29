import { Avaliacao, AvaliacaoModel } from "../models/avaliacaoModel";

class AvaliacaoService {
    private avaliacaoModel: AvaliacaoModel;

    constructor() {
        this.avaliacaoModel = new AvaliacaoModel();
    }

    async createAvaliacao(avaliacaoData: Avaliacao): Promise<Avaliacao> {
        return this.avaliacaoModel.createAvaliacoes(avaliacaoData);
    }

    async getAllAvaliacoesByUserId(avaliador_id: number): Promise<Avaliacao[]> {
        return this.avaliacaoModel.getAllAvaliacoesByUserId(avaliador_id);
    }

    async deleteAvaliacoes(id: number): Promise<void> {
        return this.avaliacaoModel.deleteAvaliacoes(id);
    }
}

export default new AvaliacaoService();

