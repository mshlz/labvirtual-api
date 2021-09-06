import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import mongoosePaginator from '../../utils/database/mongoose-paginator'

interface IImageLog {
    original_filename: string
    url: string
    size: number
    metadata: Record<string, any>
}

const ImageLogSchema = new BaseSchema<IImageLog>({
    original_filename: String,
    url: String,
    size: Number,
    metadata: Object
}, { versionKey: false, timestamps: { createdAt: true, updatedAt: false } })

ImageLogSchema.plugin(mongoosePaginator)

const ImageLog = model<IImageLog>('ImageLog', ImageLogSchema)

export { ImageLog, IImageLog }
