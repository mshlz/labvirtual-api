import { model } from 'mongoose'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { BaseSchema } from '../Base/BaseSchema'
import { IClassEnrollment } from '../ClassEnrollment/ClassEnrollment'
import { IClasswork } from '../Classwork/Classwork'
import { IQuestion } from '../Question/Question'

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
    enrollment: IClassEnrollment | string
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
    enrollment: { type: String, ref: 'ClassworkEnrollment' },
}, { versionKey: false, timestamps: true })

ClassworkAssignedSchema.plugin(mongoosePaginator)

const ClassworkAssigned = model<IClassworkAssigned>('ClassworkAssigned', ClassworkAssignedSchema)

export { ClassworkAssigned, IClassworkAssigned }
