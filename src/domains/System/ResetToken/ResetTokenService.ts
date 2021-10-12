import { createHash } from 'crypto'
import { v4 } from 'uuid'
import { IResetToken, ResetToken } from './ResetToken'

export class ResetTokenService {
    public static async create(userId: string): Promise<IResetToken> {
        const token = createHash('sha256').update(`${userId}-${v4()}-${Date.now()}`).digest('hex')
        const result = await ResetToken.create({
            token,
            userId
        })

        await result.save()
        return result
    }

    public static async use(token: string): Promise<IResetToken> {
        const result = await ResetToken.findOne({ token })
        
        if (!result) {
            return null
        }

        await ResetToken.deleteOne({ token })
        return result
    }

    public static async delete(id: string) {
        const result = await ResetToken.deleteOne({ _id: id })

        return result.deletedCount > 0
    }
}

export const resetTokenService = new ResetTokenService()
