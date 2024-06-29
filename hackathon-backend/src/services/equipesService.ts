import { Equipe, EquipeModel } from "../models/equipesModel";

class EquipeService {
    private equipeModel:  EquipeModel;

    constructor() {
        this.equipeModel = new EquipeModel();
    }

    async createEquipe(equipeData: Equipe): Promise<Equipe> {
        return this.equipeModel.createEquipe(equipeData);
    }

    async getAllEquipes(): Promise<Equipe[]> {
        return this.equipeModel.getAllEquipes();
    }

    async getEquipeById(id: number): Promise<Equipe> {
        return this.equipeModel.getEquipeById(id);
    }

    async updateEquipe(id: number, equipeData: Equipe): Promise<Equipe> {
        return this.equipeModel.updateEquipe(id, equipeData);
    }

    async deleteEquipe(id: number): Promise<void> {
        return this.equipeModel.deleteEquipe(id);
    }
}

export default new EquipeService();