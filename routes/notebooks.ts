import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient({
    log: ["query"]
})

router.get("/", async (req, res) => {
    try {
        const notebooks = await prisma.loja_Notebook.findMany({
            orderBy: { id: 'desc' }
        })
        res.status(200).json(notebooks)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Código inválido" })
    }

    try {
        const notbook = await prisma.loja_Notebook.findUnique({ where: { id } })

        if (!notbook) {
            return res.status(404).json({ error: "Notebook não encontrado" })
        }

        res.status(200).json(notbook)
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

router.get('/filtro/preco', async (req, res) => {
    try {
        const notebooks = await prisma.loja_Notebook.findMany({
            select: {
                marca: true,
                modelo: true,
                preco: true
            },
            orderBy: { preco: 'asc' }
        })
        res.status(200).json(notebooks)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/filtro/dados', async (req, res) => {
    try {
        const precoMedio = await prisma.loja_Notebook.aggregate({
            _avg: {
                preco: true
            },
            _sum: {
                qtd_estoque: true
            }
        })
        res.status(200).json(precoMedio)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/filtro/:marca/:preco', async (req, res) => {
    const { marca, preco } = req.params

    if (Number.isNaN(Number(preco))) {
        return res.status(400).json({ error: "Preço inválido" })
    }

    try {
        const notebooks = await prisma.loja_Notebook.findMany({
            where: {
                marca: {
                    contains: marca,
                },
                preco: {
                    lte: Number(preco)
                }
            }
        })
        res.status(200).json(notebooks)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/filtro/estoque', async (req, res) => {
    try {
        const notebooks = await prisma.loja_Notebook.groupBy({
            by: ['marca'],
            _sum: {
                qtd_estoque: true
            }
        })
        res.status(200).json(notebooks)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/filtro/desconto', async (req, res) => {
    try {
        const notesSemDesc = await prisma.loja_Notebook.findMany()
        const notesComDesc = notesSemDesc.map(notebook => ({
            ...notebook,
            desconto: notebook.marca === 'Dell' || notebook.marca === 'Acer'
                ? (Number(notebook.preco) * 0.9).toFixed(2)
                : (Number(notebook.preco) * 0.8).toFixed(2)
        }));
        res.status(200).json(notesComDesc)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post("/", async (req, res) => {
    const { modelo, tam_tela, marca, processador, memoria, preco, qtd_estoque } = req.body

    if (!modelo || !tam_tela || !marca || !processador || !memoria || !preco || !qtd_estoque) {
        return res.status(400).json({ error: "Dados incompletos" })
    }

    try {
        const novoNotebook = await prisma.loja_Notebook.create({
            data: { modelo, tam_tela, marca, processador, memoria, preco, qtd_estoque }
        })
        res.status(201).json({ message: "Notebook cadastrado com sucesso", notebook: novoNotebook })
    } catch (error) {
        res.status(400).json({ error: "Erro ao cadastrar notebook" })
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params

    if (Number.isNaN(Number(id))) {
        return res.status(400).json({ error: "Código inválido" })
    }

    const { modelo, tam_tela, marca, processador, memoria, preco, qtd_estoque } = req.body

    if (!modelo || !tam_tela || !marca || !processador || !memoria || !preco || !qtd_estoque) {
        return res.status(400).json({ error: "Dados incompletos" })
    }

    try {
        const notebookAtualizado = await prisma.loja_Notebook.update({
            where: { id: Number(id) },
            data: { modelo, tam_tela, marca, processador, memoria, preco, qtd_estoque }
        })
        res.status(200).json({ message: "Notebook atualizado com sucesso", notebook: notebookAtualizado })
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Notebook não encontrado" })
        }
        res.status(400).json({ error: "Erro ao atualizar notebook" })
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    if (Number.isNaN(Number(id))) {
        return res.status(400).json({ error: "Código inválido" })
    }

    try {
        const notebookDeletado = await prisma.loja_Notebook.delete({
            where: { id: Number(id) }
        })
        res.status(200).json({ message: "Notebook deletado com sucesso", notebook: notebookDeletado })
    } catch (error) {
        res.status(404).json({ error: "Notebook não encontrado" })
    }
})

export default router;