import { Document, model, Schema } from "mongoose";
import { v4 } from 'uuid'
import mongoosePaginator from "../utils/database/mongoose-paginator";
import { IDiscipline } from "./Discipline";
import { ISubject } from "./Subject";

export interface Alternative {
    correct: boolean
    text: string
}

const AlternativeSchema = new Schema<Alternative & Document>({
    _id: {
        type: String,
        default: () => Date.now().toString(36) + Math.round(Math.random() * 100000).toString(36)
    },
    text: String,
    correct: Boolean
}, { versionKey: false, timestamps: false })

AlternativeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

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
    alternatives: [AlternativeSchema],
    metadata: Object
}, { versionKey: false, timestamps: true })

QuestionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

QuestionSchema.plugin(mongoosePaginator)

const Question = model('Question', QuestionSchema)

export { Question, IQuestion }