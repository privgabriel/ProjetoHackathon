import { Avaliador, AvaliadorModel } from "../models/avaliadorModel";

class AvaliadorService {
    private avaliadorModel: AvaliadorModel;

    constructor() {
        this.avaliadorModel = new AvaliadorModel();
    }

    async createAvaliador(avaliadorData: Avaliador): Promise<Avaliador> {
        return this.avaliadorModel.createAvaliador(avaliadorData);
    }

    async getAllAvaliadores(): Promise<Avaliador[]> {
        return this.avaliadorModel.getAllAvaliadores();
    }

    async getAvaliadorById(id: number): Promise<Avaliador> {
        return this.avaliadorModel.getAvaliadorById(id);
    }

    async updateAvaliador(id: number, avaliadorData: Avaliador): Promise<Avaliador> {
        return this.avaliadorModel.updateAvaliador(id, avaliadorData);
    }

    async deleteAvaliador(id: number): Promise<void> {
        return this.avaliadorModel.deleteAvaliador(id);
    }
}

export default new AvaliadorService();