# 🛒 Loja Notebooks API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

API desenvolvida em **Node.js** com **TypeScript**, utilizando **Express** e **Prisma ORM** para integração com banco de dados **MySQL**.  
Este projeto tem como objetivo fornecer endpoints para gerenciar informações de notebooks em uma loja virtual.  

---

## 🎯 Objetivo
Este projeto faz parte dos meus **estudos e portfólio**, servindo como base para:  
- Entender a construção de uma API RESTful.  
- Gerenciar dados de notebooks (CRUD básico).  
- Servir como backend de uma aplicação de loja online.  

---

## 🛠 Tecnologias
- **Node.js** + **TypeScript**  
- **Express.js** (framework web)  
- **Prisma ORM** (mapeamento objeto-relacional)  
- **MySQL** (banco de dados relacional)  

---

## 📂 Estrutura do Projeto

📦 Loja-Notebooks
├── 📁 node_modules
├── 📁 prisma
│   ├── 📁 migrations
│   └── schema.prisma
├── 📁 routes
│   └── notebooks.ts
├── .env
├── .gitignore
├── index.ts
├── package.json
├── package-lock.json
└── tsconfig.json

---

## 📊 Diagrama ER (PlantUML)

@startuml
entity "Loja_Notebook" as notebooks {
  *id : Int <<PK>>
  --
  modelo : String (100)
  tam_tela : Decimal(3,1)
  marca : String (100)
  processador : Processador
  memoria : Int
  preco : Decimal(10,2)
  qtd_estoque : Int
}

enum "Processador" {
  Intel
  AMD
}

notebooks::processador --> Processador
@enduml
\`\`\`
