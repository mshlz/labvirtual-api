import { createHash } from 'crypto'
import { v4 } from 'uuid'
import { IResetToken, ResetToken } from "../models/ResetToken"

export class ResetTokenService {
    public static async create(parent: string): Promise<IResetToken> {
        const token = createHash('sha256').update(`${parent}-${v4()}-${Date.now()}`).digest('hex')
        const result = await ResetToken.create({
            token,
            parent
        })

        await result.save()
        return result
    }

    public static async use(token): Promise<IResetToken> {
        const result = await ResetToken.findOne({ token })
        
        if (!result) {
            return null
        }

        await ResetToken.deleteOne({ token })
        return result
    }

    public static async delete(id): Promise<any> {
        const result = await ResetToken.deleteOne({ _id: id })

        return {
            deleted: result.deletedCount > 0,
            ok: result.ok
        }
    }

}
