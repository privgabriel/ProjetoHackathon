-- Criação da tabela de Avaliadores
CREATE TABLE avaliadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Criação da tabela de Equipes
CREATE TABLE equipes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- Criação da tabela de Avaliações
CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    avaliador_id INTEGER NOT NULL REFERENCES avaliadores(id),
    equipe_id INTEGER NOT NULL REFERENCES equipes(id),
    notas JSONB NOT NULL
);

-- Adicionar restrição de unicidade para o nome da equipe
ALTER TABLE equipes ADD CONSTRAINT unique_team_name UNIQUE (nome);

-- Adicionar restrição de unicidade para o nome do avaliador
ALTER TABLE avaliadores ADD CONSTRAINT unique_avaliador_name UNIQUE (nome);

