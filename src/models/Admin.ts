import { Document, model, Schema } from "mongoose";
import { v4 } from "uuid";
import mongoosePaginator from "../utils/database/mongoose-paginator";

interface IAdmin {
    login: string
    password: string
    type: string
}

const AdminSchema = new Schema<IAdmin & Document>({
    _id: {
        type: String,
        default: v4
    },
    login: String,
    password: String,
    type: String
})

AdminSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

AdminSchema.plugin(mongoosePaginator)

const Admin = model('Admin', AdminSchema)

export { Admin, IAdmin }