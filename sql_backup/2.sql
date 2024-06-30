SELECT * FROM equipes;

SELECT * FROM avaliacoes;

DELETE FROM avaliacoes;

DELETE FROM avaliacoes;

DELETE FROM avaliadores;

DELETE FROM equipes;

SELECT * FROM avaliadores;

SELECT CASE
    WHEN COUNT(*) > 0 THEN 'true'
    ELSE 'false'
END AS ja_avaliou
FROM avaliacoes
WHERE avaliador_id = 21
  AND equipe_id = 6;

SELECT COUNT(*)
FROM avaliacoes a
JOIN equipes e ON a.equipe_id = e.id
WHERE a.avaliador_id = 21
  AND a.equipe_id = 21;


DELETE FROM avaliacoes;

SELECT * FROM avaliadores;

INSERT INTO avaliadores (nome, login, senha) VALUES ('Avaliador 1', 'avaliador1', '123456');