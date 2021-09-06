import { model } from "mongoose";
import { BaseSchema } from '../../Base/BaseSchema';
import mongoosePaginator from "../../../utils/database/mongoose-paginator";

interface IResetToken {
    token: string
    parent: string
    created_at: Date
}

const ResetTokenSchema = new BaseSchema<IResetToken>({
    token: String,
    parent: String,
    created_at: {
        type: Date,
        default: Date.now as unknown as Date,
        expires: 300 // 5min
    }
}, { versionKey: false })

ResetTokenSchema.plugin(mongoosePaginator)

const ResetToken = model<IResetToken>('ResetToken', ResetTokenSchema)

export { ResetToken, IResetToken };
