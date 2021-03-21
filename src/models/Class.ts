import { Document, model, Schema } from "mongoose";
import { v4 } from "uuid";
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
        default: v4()
    },
    name: String,
    code: String,
    teacher: { type: Schema.Types.ObjectId, ref: 'User' },
    discipline: { type: Schema.Types.ObjectId, ref: 'Discipline' },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

ClassSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

const Class = model('Class', ClassSchema)

export { Class, IClass }