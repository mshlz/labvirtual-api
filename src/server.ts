import { createApp } from './app'

const startServer = async () => {
    const app = await createApp()
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => console.log(`Server started at ${new Date().toLocaleString('pt-BR')}, Listen ${PORT}`))
}

startServer()