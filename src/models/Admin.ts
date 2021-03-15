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

const Admin = model('Admin', AdminSchema)

export { Admin, IAdmin }