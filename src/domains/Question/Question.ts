import { model } from "mongoose";
import { BaseSchema } from "../Base/BaseSchema";
import { IDiscipline } from "../Discipline/Discipline";
import { ISubject } from "../Subject/Subject";
import mongoosePaginator from "../../utils/database/mongoose-paginator";

export interface Alternative {
    correct: boolean
    text: string
}

const AlternativeSchema = new BaseSchema<Alternative & { _id: any }>({
    _id: {
        type: String,
        default: () => Date.now().toString(36) + Math.round(Math.random() * 100000).toString(36)
    },
    text: String,
    correct: Boolean
}, { versionKey: false, timestamps: false })

interface IQuestion {
    name: string
    text: string
    type: string
    discipline: string | IDiscipline
    subject: string | ISubject
    metadata: object
    alternatives: Alternative[]
}

const QuestionSchema = new BaseSchema<IQuestion>({
    name: String,
    text: String,
    type: String,
    discipline: { type: String, ref: 'Discipline' },
    subject: { type: String, ref: 'Subject' },
    alternatives: [AlternativeSchema],
    metadata: Object
}, { versionKey: false, timestamps: true })

QuestionSchema.plugin(mongoosePaginator)

const Question = model<IQuestion>('Question', QuestionSchema)

export { Question, IQuestion };
