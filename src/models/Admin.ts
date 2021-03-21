import { Document, model, Schema } from "mongoose";

interface IAdmin {
    login: string
    password: string
    type: string
}

const AdminSchema = new Schema<IAdmin & Document>({
    login: String,
    password: String,
    type: String
})

AdminSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

const Admin = model('Admin', AdminSchema)

export { Admin, IAdmin }