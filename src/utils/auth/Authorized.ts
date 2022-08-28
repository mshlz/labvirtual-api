import { ForbiddenError, UnauthorizedError, UseBefore } from "routing-controllers"
import { Role } from "./Role"
import { getAuthDataFromReq, getRoleFromName } from "./utils"

export function Authorized(role?: Role, strictType?: boolean) {
    return UseBefore((req, res, next) => {
        const authData = getAuthDataFromReq(req)

        if (!authData) {
            throw new UnauthorizedError('You must sign in')
        } else {
            const roleLocal = getRoleFromName(authData.role)

            if (
                typeof role === 'undefined' ||
                (roleLocal.level >= role.level && (strictType ? role.type === roleLocal.type : true))
            ) {
                next()
            } else {
                throw new ForbiddenError('You don\'t have permission for this action')
            }
        }
    })
}
