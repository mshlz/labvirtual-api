import { Request } from "express";
import jwt from 'jsonwebtoken';
import { ExpressMiddlewareInterface, Middleware, UnauthorizedError } from "routing-controllers";
import { JWT_SECRET } from "../config/env";

@Middleware({ type: 'before' })
export class AuthMiddleware implements ExpressMiddlewareInterface {
    private skipRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password"]

    use(request: Request, response: any, next: (err?: any) => any) {
        if (this.skipRoutes.includes(request.url)) return next()

        const token = (request.headers.authorization || '').replace('Bearer ', '')

        const payload = jwt.decode(token) as any

        if (process.env.ENV != 'dev' && payload.type != 'admin') {
            throw new UnauthorizedError("not authorized! insuficient permission")
        }

        try {
            jwt.verify(token, JWT_SECRET)

            next()
        }
        catch (_) {
            throw new UnauthorizedError("Invalid token");
        }
    }
}