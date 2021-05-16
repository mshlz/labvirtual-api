import { Document, model, Schema } from "mongoose";
import { v4 } from 'uuid'

interface IResetToken {
    token: string
    parent: string
    created_at: Date
}

const ResetTokenSchema = new Schema<IResetToken & Document>({
    _id: {
        type: String,
        default: v4
    },
    token: String,
    parent: String,
    created_at: {
        type: Date,
        default: Date.now,
        expires: 300 // 5min
    }
}, { versionKey: false })

ResetTokenSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

const ResetToken = model('ResetToken', ResetTokenSchema)

export { ResetToken, IResetToken }