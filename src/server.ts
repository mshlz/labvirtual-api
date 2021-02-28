import { createApp } from "./app";

const startServer = async () => {
    const app = await createApp()
    app.listen(process.env.PORT || 3001, () => console.log(`Server started at ${new Date().toLocaleString('pt-BR')}`))
}

startServer()