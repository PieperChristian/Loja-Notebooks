import express from 'express'
const app = express()
const port = 3000

import notebooksRoutes from './routes/notebooks.js'

app.use(express.json()) // serve para identificar que os dados estao no formato JSON
app.use("/notebooks", notebooksRoutes)

app.get('/', (req, res) => {
    res.send('API de Cadastros de Notebooks')
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
