
CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);
INSERT INTO usuario (nome, email, senha) VALUES ('Lucas Souza pereira', 'lucashcotta@hotmail.com', '123456789');