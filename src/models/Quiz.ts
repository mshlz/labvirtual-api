import { Document, model, Schema } from "mongoose";
import { v4 } from 'uuid'
import mongoosePaginator from "../utils/database/mongoose-paginator";

export interface Alternative {
    correct: boolean
    text: string
}

export interface Question {
    name: string
    text: string
    alternatives: Alternative[]
}

interface IQuiz {
    name: string
    discipline: string
    subject: string
    questions: Question[]
}

const QuizSchema = new Schema<IQuiz & Document>({
    _id: {
        type: String,
        default: v4
    },
    name: String,
    acronym: String,
    code: String,
    discipline: { type: String, ref: 'Discipline' },
    subject: { type: String, ref: 'Subject' },
    questions: [{ type: String, ref: 'Question' }],
    metadata: Object
}, { versionKey: false, timestamps: true })

QuizSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

QuizSchema.plugin(mongoosePaginator)

const Quiz = model('Quiz', QuizSchema)

export { Quiz, IQuiz }