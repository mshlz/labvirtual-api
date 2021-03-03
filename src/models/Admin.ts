import { Document, model, Schema } from "mongoose";

interface IAdmin extends Document {
    login: string
    password: string
}

const AdminSchema = new Schema({
    login: String,
    password: String
})

const Admin = model<IAdmin>('Admin', AdminSchema)

export { Admin, IAdmin }