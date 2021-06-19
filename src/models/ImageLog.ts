import { Document, model, Schema } from "mongoose";
import { v4 } from 'uuid'
import mongoosePaginator from "../utils/database/mongoose-paginator";

interface IImageLog {
    original_filename: string
    url: string
    size: number
    metadata: object
}

const ImageLogSchema = new Schema<IImageLog & Document>({
    _id: {
        type: String,
        default: v4
    },
    original_filename: String,
    url: String,
    size: Number,
    metadata: Object
}, { versionKey: false, timestamps: { createdAt: true, updatedAt: false } })

ImageLogSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

ImageLogSchema.plugin(mongoosePaginator)

const ImageLog = model('ImageLog', ImageLogSchema)

export { ImageLog, IImageLog }