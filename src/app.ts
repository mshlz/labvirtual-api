import dotenv from 'dotenv'
dotenv.config()

import 'reflect-metadata'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { useExpressServer } from 'routing-controllers'
import { connectDB } from './plugins/database/connection'
import { MONGODB_URI } from './config/env'

const createApp = async () => {
    try {
        await connectDB(MONGODB_URI)
        const app = express()

        app.use(helmet())
        app.use(cors())
        app.use(express.json())

        useExpressServer(app, {
            defaultErrorHandler: false,
            controllers: [
                __dirname + '/controllers/*.[jt]s'
            ],
            middlewares: [
                __dirname + '/middlewares/*.[jt]s'
            ]
        })

        return app

    } catch (err) {
        console.error(err)
        return null
    }
}

export { createApp }