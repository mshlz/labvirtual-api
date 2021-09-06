import { model } from "mongoose";
import { BaseSchema } from "../Base/BaseSchema";
import { IDiscipline } from "../Discipline/Discipline";
import { IQuestion } from "../Question/Question";
import { ISubject } from "../Subject/Subject";
import mongoosePaginator from "../../utils/database/mongoose-paginator";

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
    code: string
    discipline: string | IDiscipline
    subject: string | ISubject
    questions: IQuestion[]
    metadata: object
}

const QuizSchema = new BaseSchema<IQuiz>({
    name: String,
    code: String,
    discipline: { type: String, ref: 'Discipline' },
    subject: { type: String, ref: 'Subject' },
    questions: [{ type: String, ref: 'Question' }],
    metadata: Object
}, { versionKey: false, timestamps: true })

QuizSchema.plugin(mongoosePaginator)

const Quiz = model<IQuiz>('Quiz', QuizSchema)

export { Quiz, IQuiz };
