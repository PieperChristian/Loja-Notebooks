-- CreateTable
CREATE TABLE `notebooks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(100) NOT NULL,
    `marca` VARCHAR(100) NOT NULL,
    `processador` ENUM('Intel', 'AMD') NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `qtd_estoque` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
