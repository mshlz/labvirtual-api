import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { ExpressMiddlewareInterface, Middleware, UnauthorizedError } from 'routing-controllers'
import { JWT_SECRET } from '../config/env'
import { setAuthDataInReq } from '../utils/auth/utils'

@Middleware({ type: 'before' })
export class AuthMiddleware implements ExpressMiddlewareInterface {
    private skipRoutes = ['/auth/login', '/auth/register', '/auth/confirm-account', '/auth/forgot-password', '/auth/check-token', '/auth/reset-password', '/disciplines/with-subjects', '/pages/router-info']

    use(request: Request, response: any, next: (err?: any) => any) {
        if (this.skipRoutes.includes(request.url)) return next()

        const token = (request.headers.authorization || '').replace('Bearer ', '')

        try {
            if (token) {
                const payload = jwt.verify(token, JWT_SECRET) as any
                setAuthDataInReq(request, payload)
            }

            next()
        }
        catch (_) {
            throw new UnauthorizedError('Invalid token')
        }
    }
}