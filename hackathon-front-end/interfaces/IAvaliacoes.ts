export interface IAvaliacoes {
    id: number;
    avaliador_id: number
    equipe_id: number;
    notas: JSON;
}

export interface IAvaliacoesData {
    avaliador_id: number
    equipe_id: number;
    notas: JSON;
}