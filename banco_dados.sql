CREATE DATABASE IF NOT EXISTS gestao_remessas;
USE gestao_remessas;
CREATE TABLE IF NOT EXISTS remessas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_postagem DATE NOT NULL,
    servico VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade >= 1 AND quantidade <= 100),
    job INT NOT NULL CHECK (job <= 9999),
    ocr VARCHAR(9) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
