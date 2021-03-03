import dotenv from 'dotenv'
dotenv.config()

import 'reflect-metadata'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { useExpressServer } from 'routing-controllers'

const createApp = async () => {
    const app = express()

    app.use(helmet())
    app.use(cors())
    app.use(express.json())

    useExpressServer(app, {
        controllers: [
            __dirname + '/controllers/*.[jt]s'
        ]
    })

    return app
}

export { createApp }