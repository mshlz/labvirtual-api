import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import routes from './routes'

const createApp = async () => {
    const app = express()

    app.use(helmet())
    app.use(cors())
    app.use(express.json())

    app.use(routes)

    return app
}

export { createApp }