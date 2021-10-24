import { model, Schema } from 'mongoose'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { BaseSchema } from '../Base/BaseSchema'
import { IClasswork } from '../Classwork/Classwork'
import { IQuestion, QuestionType, QuestionTypeArray } from '../Question/Question'

interface IAlternative {
    code: string
    correct: boolean
    text: string
}

const AlternativeSchema = new Schema<IAlternative>({
    code: String,
    text: String,
    correct: Boolean
}, { versionKey: false, timestamps: false, _id: false })

export interface IClassworkQuestion {
    name: string
    text: string
    type: QuestionType
    value: number
    classwork: IClasswork | string
    parent: IQuestion | string
    alternatives: IAlternative[]
}

const ClassworkQuestionSchema = new BaseSchema<IClassworkQuestion>({
    name: { type: String, required: true },
    text: { type: String },
    type: { type: String, required: true, enum: QuestionTypeArray },
    value: { type: Number, required: true, default: 1 },
    classwork: {
        type: String,
        ref: 'Classwork',
        required: true,
        immutable: true
    },
    parent: {
        type: String,
        ref: 'Question',
        required: true,
        immutable: true
    },
    alternatives: [AlternativeSchema],
}, { versionKey: false, timestamps: true })

ClassworkQuestionSchema.plugin(mongoosePaginator)

export const ClassworkQuestion = model<IClassworkQuestion>('ClassworkQuestion', ClassworkQuestionSchema)
