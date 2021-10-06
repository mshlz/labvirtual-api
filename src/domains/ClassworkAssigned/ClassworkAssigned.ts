import { model } from 'mongoose'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { BaseSchema } from '../Base/BaseSchema'
import { IClasswork } from '../Classwork/Classwork'
import { IQuestion } from '../Question/Question'
import { IUser } from '../System/User/User'

interface IQuestionAnswer {
    question: IQuestion | string
    answer: string
    grade: number
    correct: boolean
    comment: string
}

interface IClassworkAssigned {
    status: string
    answers: IQuestionAnswer[]
    grade: number
    dueDate: Date
    classwork: IClasswork | string
    student: IUser | string
}

const ClassworkAssignedSchema = new BaseSchema<IClassworkAssigned>({
    status: String,
    answers: [{
        question: { type: String, ref: 'Question' },
        answer: String,
        grade: Number,
        correct: Boolean,
        comment: String
    }],
    grade: Number,
    dueDate: Date,
    classwork: { type: String, ref: 'Classwork' },
    student: { type: String, ref: 'User' },
}, { versionKey: false, timestamps: true })

ClassworkAssignedSchema.plugin(mongoosePaginator)

const ClassworkAssigned = model<IClassworkAssigned>('ClassworkAssigned', ClassworkAssignedSchema)

export { ClassworkAssigned, IClassworkAssigned }
