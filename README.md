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
Necessário já ter préviamente instalado na máquina:
- **Node.js** + **TypeScript**  
- **Express.js** (framework web)  
- **Prisma ORM** (mapeamento objeto-relacional)  
- **MySQL** (banco de dados relacional)  

---

## 📂 Estrutura do Projeto
```bash
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
```
---

### 📋 Tabela: notebooks

| Campo | Tipo | Descrição | Restrições |
|:---|:---|:---|:---|
| id | Int | Identificador único | Chave primária, auto incremento |
| modelo | String | Modelo do notebook | Máximo 100 caracteres |
| tam_tela | Decimal | Tamanho da tela em polegadas | Padrão 0, até 3 dígitos e 1 casa decimal |
| marca | String | Fabricante do notebook | Máximo 100 caracteres |
| processador | Enum | Tipo de processador | Valores: Intel ou AMD |
| memoria | Int | Quantidade de memória RAM | Padrão 0 |
| preco | Decimal | Preço do notebook | Precisão (10,2) |
| qtd_estoque | Int | Quantidade disponível em estoque | - |

### 🎯 Enum: Processador

Valores permitidos para o campo `processador`:

**Intel**
**AMD**

## 🔖 Modelo Prisma (schema.prisma)
```prisma
model Notebook {
  id            Int      @id @default(autoincrement())
  modelo        String   @db.VarChar(100)
  tam_tela      Decimal  @default(0) @db.Decimal(3, 1)
  marca         String   @db.VarChar(100)
  processador   Processador
  memoria       Int      @default(0)
  preco         Decimal  @db.Decimal(10, 2)
  qtd_estoque   Int
  
  @@map("notebooks")
}

enum Processador {
  Intel
  AMD
}
```
---

## ⚙️ Instalação e execução

### 1. Clonar o repositório 
```bash
git clone git@github.com:PieperChristian/Loja-Notebooks.git
cd Loja-Notebooks
```
### 2. Instalar dependências
```bash
npm install
```
### 3. Configurar variáveis de ambiente
Crie um arquivo .env na raiz do projeto com algo como:
```env
DATABASE_URL="mysql://root:Sua_Senha_Do_MySQL@localhost:3306/loja_notebooks"
```
### 4. Criar o banco de dados
Acesse o MySQL via terminal e digite:
```bash
create database if not exists loja_notebooks
```
### 5. Executar migrations
```bash
npx prisma migrate dev --name init
```
### 6. Rodar a aplicação
```bash
npm run dev
```
---
## 📡 Rotas da API
### 🔹 Listar todos os notebooks
```http
GET /notebooks
```
### Response
```json
[
  {
    "id": 1,
    "modelo": "Inspiron 15",
    "tam_tela": 15.6,
    "marca": "Dell",
    "processador": "Intel",
    "memoria": 8,
    "preco": 3500.00,
    "qtd_estoque": 10
  }
]
```

### 🔹 Buscar notebook por ID
```http
GET /notebooks/:id
```
Exemplo:
```http
GET /notebooks/1
```
### Response
```json
{
  "id": 1,
  "modelo": "Inspiron 15",
  "tam_tela": 15.6,
  "marca": "Dell",
  "processador": "Intel",
  "memoria": 8,
  "preco": 3500.00,
  "qtd_estoque": 10
}
```
---
## 🛠️ Funcionalidades
### Implementadas
	•	Listar notebooks
	•	Buscar notebook por ID
	•	Criar notebook
	•	Atualizar notebook
	•	Deletar notebook
### Futuras
	•	Autenticação e autorização
___
## 🤝 Contribuição
Sinta-se à vontade para abrir issues e enviar pull requests.
Sugestões e melhorias são muito bem-vindas 🚀.
___
##📄 Licença
Este projeto está sob a licença MIT.
```
---

👉 Quer que eu também crie uma **seção com diagrama ER gerado automaticamente** a partir do Prisma (com imagem ou PlantUML) para incluir no README? Isso deixa o projeto ainda mais atrativo para portfólio.
```
