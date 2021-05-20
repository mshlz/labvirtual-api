import { Document, model, Schema } from "mongoose";
import { v4 } from "uuid";
import { IDiscipline } from "./Discipline";
import { ISubject } from "./Subject";

interface ILesson {
    name: string
    code: string
    content: string
    discipline: IDiscipline
    subject: ISubject
}

const LessonSchema = new Schema<ILesson & Document>({
    _id: {
        type: String,
        default: v4
    },
    name: String,
    code: String,
    content: String,
    discipline: { type: String, ref: 'Discipline' },
    subject: { type: String, ref: 'Subject' },
}, { versionKey: false, timestamps: true })

LessonSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

const Lesson = model('Lesson', LessonSchema)

export { Lesson, ILesson };
