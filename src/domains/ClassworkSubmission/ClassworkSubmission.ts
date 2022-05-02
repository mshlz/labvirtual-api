import { model } from 'mongoose'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { BaseSchema, BaseSchemaInterface } from '../Base/BaseSchema'
import { IClass } from '../Class/Class'
import { IClasswork } from '../Classwork/Classwork'
import { IClassworkQuestion } from '../ClassworkQuestion/ClassworkQuestion'
import { IUser } from '../System/User/User'

export interface IQuestionAnswer {
    question: IClassworkQuestion | string
    answer: string | string[]
    grade: number
    correct: boolean
    comment: string
}

const SubmissionStatusEnum = ['NEW', 'SUBMITTED', 'RETURNED'] as const
type SubmissionStatus = typeof SubmissionStatusEnum[number]

export interface IClassworkSubmission extends BaseSchemaInterface {
    class: IClass | string
    classwork: IClasswork | string
    student: IUser | string
    status: SubmissionStatus
    grade: number
    answers: IQuestionAnswer[]
    submittedAt: Date
}

const ClassworkSubmissionSchema = new BaseSchema<IClassworkSubmission>({
    class: { type: String, ref: 'Class' },
    classwork: { type: String, ref: 'Classwork' },
    student: { type: String, ref: 'User' },
    status: { type: String, default: 'NEW', enum: SubmissionStatusEnum },
    grade: Number,
    answers: [{
        question: { type: String, ref: 'ClassworkQuestion' },
        answer: String,
        grade: Number,
        correct: Boolean,
        comment: String
    }],
    submittedAt: Date,
}, { versionKey: false, timestamps: true })

ClassworkSubmissionSchema.plugin(mongoosePaginator)

export const ClassworkSubmission = model<IClassworkSubmission>('ClassworkSubmission', ClassworkSubmissionSchema)
