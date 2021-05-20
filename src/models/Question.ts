import { Document, model, Schema } from "mongoose";
import { v4 } from 'uuid'
import { IDiscipline } from "./Discipline";
import { ISubject } from "./Subject";

export interface Alternative {
    correct: boolean
    text: string
}

interface IQuestion {
    name: string
    text: string
    type: string
    discipline: IDiscipline
    subject: ISubject
    metadata: object
    alternatives: Alternative[]
}

const QuestionSchema = new Schema<IQuestion & Document>({
    _id: {
        type: String,
        default: v4
    },
    name: String,
    text: String,
    type: String,
    discipline: { type: String, ref: 'Discipline' },
    subject: { type: String, ref: 'Subject' },
    alternatives: [
        {
            code: String,
            correct: Boolean,
            text: String,
            // correlated: [String]
        }
    ],
    metadata: Object
}, { versionKey: false, timestamps: true })

QuestionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

const Question = model('Question', QuestionSchema)

export { Question, IQuestion }