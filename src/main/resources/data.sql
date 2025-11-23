
-- ============================
-- TABELA DE USUÁRIO
-- ============================
CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- INSERT INTO usuario (nome, email, senha)
-- VALUES 
-- ('Lucas Souza Pereira', 'lucashcotta@hotmail.com', '123456789');

-- ============================
-- TABELA DE PROPRIEDADE
-- ============================
CREATE TABLE IF NOT EXISTS propriedade (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    codigo VARCHAR(255),
    proprietario_id BIGINT,
    FOREIGN KEY (proprietario_id) REFERENCES usuario(id)
);

-- INSERT INTO propriedade (id,nome, descricao, codigo, proprietario_id) VALUES
-- (1,'Recanto do Mar', 'Casa ampla com vista para o mar, piscina e área gourmet completa.', 'RECANTO01', 1),
-- (2,'Casa das Ondas', 'Aconchegante e moderna, a poucos metros da praia das Castanheiras.', 'ONDAS02', 1),
-- (3,'Refúgio da Serra', 'Casa de campo rodeada pela natureza, ideal para relaxar.', 'REFUGIO03', 1);

-- ============================
-- TABELA DE SERVIÇO
-- ============================
CREATE TABLE IF NOT EXISTS servico_extra (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    propriedade_id BIGINT,
    FOREIGN KEY (propriedade_id) REFERENCES propriedade(id)
);

-- Serviços para Recanto do Mar
-- INSERT INTO servico_extra (nome, descricao, preco, propriedade_id) VALUES
-- ('Serviço de Café da Manhã', 'Cesta de café da manhã completa entregue na propriedade.', 60.00, 1),
-- ('Aluguel de Caiaque', 'Caiaque duplo para passeios nas águas calmas da praia.', 120.00, 1),
-- ('Serviço de Limpeza Diária', 'Limpeza completa da casa durante a estadia.', 100.00, 1);

-- -- Serviços para Casa das Ondas
-- INSERT INTO servico_extra (nome, descricao, preco, propriedade_id) VALUES
-- ('Pacote Romântico', 'Decoração especial com pétalas e espumante.', 180.00, 2),
-- ('Massagem Relaxante', 'Sessão de massagem com terapeuta profissional.', 150.00, 2),
-- ('Transfer Aeroporto', 'Transporte privado de ida e volta ao aeroporto de Vitória.', 250.00, 2);

-- -- Serviços para Refúgio da Serra
-- INSERT INTO servico_extra (nome, descricao, preco, propriedade_id) VALUES
-- ('Tour pela Serra', 'Passeio guiado pelas trilhas e cachoeiras próximas.', 200.00, 3),
-- ('Cesta de Vinhos e Queijos', 'Seleção de vinhos locais e queijos artesanais.', 180.00, 3),
-- ('Fogueira Noturna', 'Montagem e manutenção de fogueira ao ar livre.', 90.00, 3);
