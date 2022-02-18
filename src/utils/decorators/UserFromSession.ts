import { createParamDecorator } from 'routing-controllers'
import { User } from '../../domains/System/User/User'
import jwt from 'jsonwebtoken'

export function UserFromSession(options?: { required?: boolean }) {
    return createParamDecorator({
        required: options && options.required ? true : false,
        value: async (action) => {
            const token = action.request.headers['authorization'].replace('Bearer ', '')
            const { user } = jwt.decode(token) as any
            return await User.findById(user).lean(true)
        },
    })
}