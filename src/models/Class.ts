import { Document, model, Schema } from "mongoose";
import { v4 } from "uuid";
import mongoosePaginator from "../utils/database/mongoose-paginator";
import { IDiscipline } from "./Discipline";
import { IUser } from "./User";

interface IClass {
    name: string
    code: string
    teacher: IUser
    discipline: IDiscipline
    students: IUser[]
}

const ClassSchema = new Schema<IClass & Document>({
    _id: {
        type: String,
        default: v4
    },
    name: String,
    code: String,
    teacher: { type: String, ref: 'User' },
    discipline: { type: String, ref: 'Discipline' },
    students: [{ type: String, ref: 'User' }]
}, { versionKey: false, timestamps: true })

ClassSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

ClassSchema.plugin(mongoosePaginator)

const Class = model('Class', ClassSchema)

export { Class, IClass }