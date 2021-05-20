import { Document, model, Schema } from "mongoose";
import { v4 } from "uuid";
import { IDiscipline } from "./Discipline";

interface ISubject {
    name: string
    code: string
    discipline: IDiscipline
}

const SubjectSchema = new Schema<ISubject & Document>({
    _id: {
        type: String,
        default: v4
    },
    name: String,
    code: String,
    discipline: { type: String, ref: 'Discipline' },
}, { versionKey: false, timestamps: true })

SubjectSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

const Subject = model('Subject', SubjectSchema)

export { Subject, ISubject };
