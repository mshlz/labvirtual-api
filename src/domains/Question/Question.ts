import { model, Schema } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import { IDiscipline } from '../Discipline/Discipline'
import { ISubject } from '../Subject/Subject'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { getNanoId } from '../../utils/nanoid'

interface IAlternative {
    code: string
    correct: boolean
    text: string
}

const AlternativeSchema = new Schema<IAlternative>({
    code: {
        type: String,
        default: () => getNanoId(5)
    },
    text: { type: String, required: true },
    correct: Boolean
}, { versionKey: false, timestamps: false, _id: false })

export const QuestionTypeArray = ['DISSERTATIVE', 'SINGLE_CHOICE', 'MULTIPLE_CHOICE'] as const
export type QuestionType = typeof QuestionTypeArray[number]

export interface IQuestion {
    name: string
    text?: string
    type: QuestionType
    disciplines?: string[] | IDiscipline[]
    subjects?: string[] | ISubject[]
    alternatives?: IAlternative[]
}

const QuestionSchema = new BaseSchema<IQuestion>({
    name: { type: String, required: true },
    text: { type: String },
    type: { type: String, required: true, enum: QuestionTypeArray },
    disciplines: [{ type: String, ref: 'Discipline' }],
    subjects: [{ type: String, ref: 'Subject' }],
    alternatives: [AlternativeSchema],
}, { versionKey: false, timestamps: true })

QuestionSchema.plugin(mongoosePaginator)

export const Question = model<IQuestion>('Question', QuestionSchema)
