DROP TABLE IF EXISTS TB_HEROIS;

CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
);

-- Create
INSERT INTO TB_HEROIS (NOME, PODER)
VALUES
    ('Flash', 'Velocidade'),
    ('Aquaman', 'Falar com os animais marinhos'),
    ('Batman', 'Dinheiro');

-- Read
SELECT * FROM TB_HEROIS;
SELECT * FROM TB_HEROIS WHERE NOME = 'Flash';

-- Update
UPDATE TB_HEROIS
SET NOME = 'Goku', PODER = 'Deus'
WHERE ID = 1;

-- Delete
DELETE FROM TB_HEROIS WHERE ID = 2;
