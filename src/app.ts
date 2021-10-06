import dotenv from 'dotenv'
dotenv.config()

import 'reflect-metadata'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { useExpressServer } from 'routing-controllers'
import { connectDB } from './utils/database/connection'
import { MONGODB_URI } from './config/env'
import './utils/validator/custom-rules/exists'


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
                __dirname + '/domains/**/*Controller.[jt]s'
            ],
            middlewares: [
                __dirname + '/middlewares/*.[jt]s'
            ]
        })

        app.use('*', (req, res, next) => {
            if (res.headersSent) return next()
            return res.status(404).json({ code: 404, message: 'Not Found' })
        })

        return app

    } catch (err) {
        console.error(err)
        return null
    }
}

export { createApp }