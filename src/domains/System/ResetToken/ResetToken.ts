import { model } from 'mongoose'
import { BaseSchema } from '../../Base/BaseSchema'

interface IResetToken {
    token: string
    userId: string
    type: string
    created_at: Date
}

const ResetTokenSchema = new BaseSchema<IResetToken>({
    token: String,
    userId: String,
    type: String,
    created_at: {
        type: Date,
        default: Date.now as unknown as Date,
        expires: 300 // 5min
    }
}, { versionKey: false })

const ResetToken = model<IResetToken>('ResetToken', ResetTokenSchema)

export { ResetToken, IResetToken }
